function json(data, status=200){
  return new Response(JSON.stringify(data), {status, headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}});
}

export async function onRequestPost({request, env}){
  if(!env.DB) return json({error:"D1 binding DB not configured"},500);
  let b; try { b=await request.json(); } catch { return json({error:"invalid_json"},400); }
  const name=String(b.name||"").trim().slice(0,120);
  const correct=Number(b.correct), total=Number(b.total), pct=Number(b.pct);
  if(!name || !Number.isFinite(correct) || !Number.isFinite(total) || !Number.isFinite(pct)) return json({error:"invalid_payload"},400);
  const wrong=Array.isArray(b.wrong)?b.wrong.slice(0,100):[];
  const wrongNos=wrong.map(x=>Number(x.no)).filter(Number.isFinite).join(",");
  const wrongJson=JSON.stringify(wrong);
  const ua=(request.headers.get("user-agent")||"").slice(0,500);
  const id=crypto.randomUUID();
  await env.DB.prepare(`INSERT INTO exam_results (id,name,submitted_at,correct,total,pct,wrong_count,wrong_nos,wrong_json,user_agent) VALUES (?,?,datetime('now'),?,?,?,?,?,?,?)`)
    .bind(id,name,correct,total,pct,wrong.length,wrongNos,wrongJson,ua).run();
  return json({ok:true,id});
}

export async function onRequestGet({request, env}){
  if(!env.DB) return json({error:"D1 binding DB not configured"},500);
  const expected=env.ADMIN_KEY;
  const supplied=request.headers.get("x-admin-key")||"";
  if(!expected || supplied!==expected) return json({error:"unauthorized"},401);
  const url=new URL(request.url);
  const limit=Math.min(Math.max(Number(url.searchParams.get("limit"))||200,1),1000);
  const {results}=await env.DB.prepare(`SELECT id,name,submitted_at,correct,total,pct,wrong_count,wrong_nos,wrong_json FROM exam_results ORDER BY submitted_at DESC LIMIT ?`).bind(limit).all();
  return json({ok:true,results});
}
