const flights = [
 {id:"AG 204",route:"Almaty → Astana",departure:"14:35",weather:"Crosswind elevated",weatherLevel:"amber",technical:"No open defect",technicalLevel:"green",score:68,status:"Review",statusClass:"review",factors:["Crosswind indicator is elevated in sample conditions","Review runway-specific limits and approved procedures"]},
 {id:"AG 118",route:"Astana → Shymkent",departure:"15:10",weather:"Visibility reduced",weatherLevel:"red",technical:"Inspection due",technicalLevel:"amber",score:82,status:"Priority review",statusClass:"hold",factors:["Reduced visibility is flagged in illustrative weather data","A maintenance inspection is shown as due in the sample record"]},
 {id:"AG 331",route:"Almaty → Aktau",departure:"16:00",weather:"Stable conditions",weatherLevel:"green",technical:"No open defect",technicalLevel:"green",score:18,status:"Low signal",statusClass:"clear",factors:["No elevated weather indicator in this sample","No open technical item is recorded in this sample"]},
 {id:"AG 507",route:"Shymkent → Astana",departure:"16:25",weather:"Thunderstorm watch",weatherLevel:"red",technical:"No open defect",technicalLevel:"green",score:74,status:"Priority review",statusClass:"hold",factors:["Convective activity flag appears in the sample weather record","Review approved route and weather information before any real operation"]},
 {id:"AG 612",route:"Astana → Almaty",departure:"17:05",weather:"Light precipitation",weatherLevel:"amber",technical:"Routine check due",technicalLevel:"amber",score:49,status:"Review",statusClass:"review",factors:["Precipitation is flagged as a review prompt","Routine maintenance check is due in the sample record"]}
];
const maintenance = [
 {id:"MX-1042",title:"Hydraulic system inspection",aircraft:"Aircraft KZ-DMO (fictional)",priority:"High",due:"Due before next dispatch in sample",description:"Illustrative task card indicates an inspection is due. Confirm the approved maintenance program and actual technical log before taking action."},
 {id:"MX-1048",title:"Engine vibration trend review",aircraft:"Aircraft KZ-AXR (fictional)",priority:"High",due:"Review requested",description:"Synthetic vibration trend exceeds the demo alert threshold. This is not an actual engine measurement or a diagnosis."},
 {id:"MX-1051",title:"Landing light replacement",aircraft:"Aircraft KZ-ALM (fictional)",priority:"Medium",due:"Next planned maintenance",description:"A sample component replacement item is open. Check aircraft-specific MEL and approved maintenance documentation."},
 {id:"MX-1059",title:"Cabin pressure sensor check",aircraft:"Aircraft KZ-ASA (fictional)",priority:"Medium",due:"Within 48 hours (sample)",description:"Example sensor verification task. The time window is illustrative and must not be used for real maintenance planning."}
];
const weather = [
 {code:"ALA",name:"Almaty",icon:"⛅",temp:"18°",condition:"Partly cloudy",wind:"18 km/h",visibility:"10 km",precip:"Low",level:"Low"},
 {code:"NQZ",name:"Astana",icon:"🌬",temp:"9°",condition:"Windy",wind:"31 km/h",visibility:"7 km",precip:"Low",level:"Elevated"},
 {code:"CIT",name:"Shymkent",icon:"⛈",temp:"21°",condition:"Storm watch",wind:"24 km/h",visibility:"5 km",precip:"Moderate",level:"High"}
];
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
function riskClass(score){return score>=70?"risk-high":score>=40?"risk-med":"positive"}
function renderRisks(){
 const ranked=[...flights].sort((a,b)=>b.score-a.score).slice(0,3);
 $("#riskList").innerHTML=ranked.map(f=>`<div class="risk-item"><div class="risk-symbol">${f.score>=70?"!":"↗"}</div><div class="risk-copy"><strong>${f.id} · ${f.route}</strong><p>${f.factors[0]}</p></div><div class="risk-score"><strong class="${riskClass(f.score)}">${f.score}<small>/100</small></strong><small>Demo score</small></div></div>`).join("");
 $("#riskCount").textContent=String(flights.filter(f=>f.score>=60).length).padStart(2,"0");
}
function flightRows(query="",filter="all"){
 const q=query.toLowerCase();
 return flights.filter(f=>(`${f.id} ${f.route}`.toLowerCase().includes(q))&&(filter==="all"|| (filter==="high"?f.score>=60:filter==="low"?f.score<40:f.score>=40&&f.score<60))).map(f=>`<tr><td><div class="flight-name">${f.id}</div><div class="route">${f.route}</div></td><td>${f.departure}</td><td><span class="weather-cell"><i class="weather-dot dot-${f.weatherLevel}"></i>${f.weather}</span></td><td><span class="weather-cell"><i class="weather-dot dot-${f.technicalLevel}"></i>${f.technical}</span></td><td><div class="score-cell"><span class="score-number ${riskClass(f.score)}">${f.score}</span><span class="score-track"><span style="width:${f.score}%;background:${f.score>=70?'#ff7d86':f.score>=40?'#f3bd65':'#5fdbb0'}"></span></span></div></td><td><span class="status ${f.statusClass}">${f.status}</span></td></tr>`).join("");
}
function renderFlights(){
 const q=$("#flightSearch")?.value||"";
 const filter=$("#riskFilter")?.dataset.filter||"all";
 $("#flightRows").innerHTML=flightRows(q,filter);
 $("#tableCount").textContent=`Showing ${flights.filter(f=>(`${f.id} ${f.route}`.toLowerCase().includes(q.toLowerCase()))&&(filter==="all"||(filter==="high"?f.score>=60:filter==="low"?f.score<40:f.score>=40&&f.score<60))).length} sample flights`;
 if($("#flightRows2"))$("#flightRows2").innerHTML=flightRows($("#flightSearch2")?.value||"");
}
function renderMaintenance(){
 $("#maintenanceGrid").innerHTML=maintenance.map(m=>`<article class="maintenance-card"><div class="maint-top"><span class="maint-id">${m.id}</span><span class="maint-priority ${m.priority.toLowerCase()}">${m.priority} priority</span></div><h3>${m.title}</h3><p>${m.description}</p><div class="maint-bottom"><span>${m.aircraft}</span><strong>${m.due}</strong></div></article>`).join("");
}
function renderWeather(){
 $("#weatherGrid").innerHTML=weather.map(w=>`<article class="weather-card"><h3>${w.name}</h3><div class="airport-code">${w.code} · SAMPLE AIRPORT</div><div class="weather-main"><span class="weather-emoji">${w.icon}</span><div><strong>${w.temp}</strong><small>${w.condition}</small></div><span class="status ${w.level==="Low"?"clear":w.level==="High"?"hold":"review"}" style="margin-left:auto">${w.level} signal</span></div><div class="weather-factors"><div class="weather-factor"><span>Wind</span><strong>${w.wind}</strong></div><div class="weather-factor"><span>Visibility</span><strong>${w.visibility}</strong></div><div class="weather-factor"><span>Precipitation</span><strong>${w.precip}</strong></div></div></article>`).join("");
}
function showToast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove("show"),2800)}
function navigate(view){
 $$(".view").forEach(el=>el.classList.add("hidden"));
 $(`#${view}View`)?.classList.remove("hidden");
 $$(".nav-item").forEach(el=>el.classList.toggle("active",el.dataset.view===view));
 const labels={overview:["Overview","Good afternoon, Analyst ✦","A unified view of flight, weather, and maintenance risk signals."],flights:["Flight monitoring","Flight monitoring","Review simulated risk factors for each sample flight."],maintenance:["Maintenance","Maintenance watchlist","Prioritize sample maintenance items for human review."],weather:["Weather risks","Weather risk overview","Understand the illustrative weather factors behind each alert."],reports:["Reports","Safety reports","Export a transparent snapshot of the demo dataset."]};
 $("#pageCrumb").textContent=labels[view][0];$("#pageTitle").textContent=labels[view][1];$("#pageSubtitle").textContent=labels[view][2];
}
function download(name,content,type){const blob=new Blob([content],{type});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);showToast("Report downloaded successfully");}
function exportReport(){
 const report={project:"AeroGuard AI",generated_at:new Date().toISOString(),data_type:"FICTIONAL_DEMO_DATA",disclaimer:"Not for operational use. Scores are illustrative and do not provide dispatch clearance.",flights,maintenance,weather};
 download("aeroguard-safety-report.json",JSON.stringify(report,null,2),"application/json");
 const headers=["flight","route","departure","weather","technical","risk_score","status","risk_factors"];
 const csv=[headers.join(","),...flights.map(f=>[f.id,f.route,f.departure,f.weather,f.technical,f.score,f.status,f.factors.join("; ")].map(v=>`"${String(v).replaceAll('"','""')}"`).join(","))].join("\n");
 download("aeroguard-flight-risk.csv",csv,"text/csv;charset=utf-8");
}
$$(".nav-item").forEach(b=>b.addEventListener("click",()=>navigate(b.dataset.view)));
$$("[data-goto]").forEach(b=>b.addEventListener("click",()=>navigate(b.dataset.goto)));
$("#flightSearch").addEventListener("input",renderFlights);
$("#flightSearch2").addEventListener("input",renderFlights);
$("#riskFilter").addEventListener("click",e=>{const order=["all","high","medium","low"];const labels={all:"All risks⌄",high:"High risk⌄",medium:"Medium risk⌄",low:"Low risk⌄"};const next=order[(order.indexOf(e.currentTarget.dataset.filter||"all")+1)%order.length];e.currentTarget.dataset.filter=next;e.currentTarget.textContent=labels[next];renderFlights()});
$("#exportBtn").addEventListener("click",exportReport);$("#exportBtn2").addEventListener("click",exportReport);
$("#refreshBtn").addEventListener("click",()=>{$("#updatedAt").textContent=new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});showToast("Demo dashboard refreshed");});
renderRisks();renderFlights();renderMaintenance();renderWeather();
