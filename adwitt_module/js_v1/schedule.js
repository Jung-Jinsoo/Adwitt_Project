var mon=[];
var tue=[];
var wedn=[];
var thur=[];
var fir=[];
var sat=[];
var sun=[]; //요일별 배열
var allday_set="";
var except_day=[];
var class_set="";//클래스 추출
var split_day="";//클래스에서 숫자 추출 임시저장
var eq_day="";
var day_not="";
var start_time=-1;
var start_spot=0;
var end_time=0;
var end_spot=0;
var q=0;
var m=0;
var z=0;
var m_jsondata="";
var total_jsondata="";
var expose_time_day="";

function schedule_json(){
	$("#schedule_data").val("");
	$("span[id^=all]").each(function(i){
		if($("#all_"+i).attr("class").indexOf("ui-selected") > -1){
			except_day[i]=i;
			allday_set=allday_set+i;
			allday_set=allday_set+",";
		}else{
			except_day[i]=8;
		}
	});
	if((allday_set.charAt(allday_set.length-1))==","){
		allday_set=allday_set.slice(0,-1);
	}
	
	for(var j=0; j<7; j++){
		$(".times.day"+j).find('span').each(function(y){
			class_set=$(this).attr("class");
			if(j==1){
				if(class_set.indexOf("ui-selected") > -1){
					mon[y] = 1;
					if(expose_time_day.indexOf("1")==-1){
						expose_time_day +="1,";
					}
				}else{
					mon[y]=0;
				}
			}
			else if(j==2){
				if(class_set.indexOf("ui-selected") > -1){ 
					tue[y] = 1;
					if(expose_time_day.indexOf("2")==-1){
						expose_time_day +="2,";
					}
				}else{
					tue[y]=0;
				}
			}
			else if(j==3){
				if(class_set.indexOf("ui-selected") > -1){
					wedn[y] = 1;
					if(expose_time_day.indexOf("3")==-1){
						expose_time_day +="3,";
					}
				}else{
					wedn[y]=0;
				}
			}
			else if(j==4){
				if(class_set.indexOf("ui-selected") > -1){
					thur[y] = 1;
					if(expose_time_day.indexOf("4")==-1){
						expose_time_day +="4,";
					}
				}else{
					thur[y]=0;
				}
			}
			else if(j==5){
				if(class_set.indexOf("ui-selected") > -1){
					fir[y] = 1;
					if(expose_time_day.indexOf("5")==-1){
						expose_time_day +="5,";
					}
				}else{
					fir[y]=0;
				}
			}
			else if(j==6){
				if(class_set.indexOf("ui-selected") > -1){
					sat[y] = 1;
					if(expose_time_day.indexOf("6")==-1){
						expose_time_day +="6,";
					}
				}else{
					sat[y]=0;
				}
			}
			else if(j==0){
				if(class_set.indexOf("ui-selected") > -1){
					sun[y] = 1;
					if(expose_time_day.indexOf("0")==-1){
						expose_time_day +="0,";
					}
				}else{
					sun[y]=0;
				}
			} 
		});
	}
	if((expose_time_day.charAt(expose_time_day.length-1))==","){
		expose_time_day=expose_time_day.slice(0,-1);
	}
		
	for(m=0; m<7; m++){
		for(z=0; z<24; z++){
			if(sun[z]==1){
				if(start_time==-1){
					if(z==0){start_time=0; start_spot=0;}else{start_time=z*60; start_spot=z;}				
				}
				if(except_day[m]==8){
					if(eq_day.indexOf("0")==-1){eq_day="0";}					
					if(sun[z]==mon[z]){if(eq_day.indexOf("1")==-1){eq_day=eq_day+",1";}}else{day_not=day_not+",1";}
					if(sun[z]==tue[z]){if(eq_day.indexOf("2")==-1){eq_day=eq_day+",2"}}else{day_not=day_not+",2";}
					if(sun[z]==wedn[z]){if(eq_day.indexOf("3")==-1){eq_day=eq_day+",3"}}else{day_not=day_not+",3";}
					if(sun[z]==thur[z]){if(eq_day.indexOf("4")==-1){eq_day=eq_day+",4"}}else{day_not=day_not+",4";}
					if(sun[z]==fir[z]){if(eq_day.indexOf("5")==-1){eq_day=eq_day+",5"}}else{day_not=day_not+",5";}
					if(sun[z]==sat[z]){if(eq_day.indexOf("6")==-1){eq_day=eq_day+",6"}}else{day_not=day_not+",6";}
					
					if(sun[Number(z)-1]!=mon[Number(z)-1]){day_not=day_not+",1";}
					if(sun[Number(z)-1]!=tue[Number(z)-1]){day_not=day_not+",2";}
					if(sun[Number(z)-1]!=wedn[Number(z)-1]){day_not=day_not+",3";}
					if(sun[Number(z)-1]!=thur[Number(z)-1]){day_not=day_not+",4";}
					if(sun[Number(z)-1]!=fir[Number(z)-1]){day_not=day_not+",5";}
					if(sun[Number(z)-1]!=sat[Number(z)-1]){day_not=day_not+",6";}
				}
			}else if((sun[Number(z)-1]==1) && (sun[z]==0)){
				end_time=z*60;
				end_spot=z;
				if(((day_not.indexOf("1") > -1) && (eq_day.indexOf("1") > -1)) || (mon[z]==1)){eq_day=eq_day.replace(",1","");}
				if(((day_not.indexOf("2") > -1) && (eq_day.indexOf("2") > -1)) || (tue[z]==1)){eq_day=eq_day.replace(",2","");}
				if(((day_not.indexOf("3") > -1) && (eq_day.indexOf("3") > -1)) || (wedn[z]==1)){eq_day=eq_day.replace(",3","");}
				if(((day_not.indexOf("4") > -1) && (eq_day.indexOf("4") > -1)) || (thur[z]==1)){eq_day=eq_day.replace(",4","");}
				if(((day_not.indexOf("5") > -1) && (eq_day.indexOf("5") > -1)) || (fir[z]==1)){eq_day=eq_day.replace(",5","");}
				if(((day_not.indexOf("6") > -1) && (eq_day.indexOf("6") > -1)) || (sat[z]==1)){eq_day=eq_day.replace(",6","");}
				
				if((m_jsondata=="")||(m_jsondata==null)){
					m_jsondata='{"days":['+eq_day+'],"start_minute":'+start_time+',"end_minute":'+end_time+'}';
					start_time=-1;
					day_not="";
					 for(q=end_spot; q>=start_spot; q--){
						sun[q]=0;
						if(eq_day.indexOf("1")>-1){mon[q]=0;}
						if(eq_day.indexOf("2")>-1){tue[q]=0;}
						if(eq_day.indexOf("3")>-1){wedn[q]=0;}
						if(eq_day.indexOf("4")>-1){thur[q]=0;}
						if(eq_day.indexOf("5")>-1){fir[q]=0;}
						if(eq_day.indexOf("6")>-1){sat[q]=0;}
					} 
				}else{
					m_jsondata=m_jsondata+',{"days":['+eq_day+'],"start_minute":'+start_time+',"end_minute":'+end_time+'}';
					start_time=-1;
					day_not="";
					for(q=end_spot; q>=start_spot; q--){
						sun[q]=0;
						if(eq_day.indexOf("1")>-1){mon[q]=0;}
						if(eq_day.indexOf("2")>-1){tue[q]=0;}
						if(eq_day.indexOf("3")>-1){wedn[q]=0;}
						if(eq_day.indexOf("4")>-1){thur[q]=0;}
						if(eq_day.indexOf("5")>-1){fir[q]=0;}
						if(eq_day.indexOf("6")>-1){sat[q]=0;}
					} 
				}
			}
			if(z==23){
				if(sun[z]==1){
					end_time=1440;
					end_spot=z;
					if((day_not.indexOf("1") > -1) && (eq_day.indexOf("1") > -1)){eq_day=eq_day.replace(",1","");}
					if((day_not.indexOf("2") > -1) && (eq_day.indexOf("2") > -1)){eq_day=eq_day.replace(",2","");}
					if((day_not.indexOf("3") > -1) && (eq_day.indexOf("3") > -1)){eq_day=eq_day.replace(",3","");}
					if((day_not.indexOf("4") > -1) && (eq_day.indexOf("4") > -1)){eq_day=eq_day.replace(",4","");}
					if((day_not.indexOf("5") > -1) && (eq_day.indexOf("5") > -1)){eq_day=eq_day.replace(",5","");}
					if((day_not.indexOf("6") > -1) && (eq_day.indexOf("6") > -1)){eq_day=eq_day.replace(",6","");}
					
					if(m==6){
						if((m_jsondata=="")||(m_jsondata==null)){
							m_jsondata='{"days":['+eq_day+'],"start_minute":'+start_time+',"end_minute":'+end_time+'}';
							start_time=-1;
							day_not="";
							 for(q=end_spot; q>=start_spot; q--){
								sun[q]=0;
								if(eq_day.indexOf("1")>-1){mon[q]=0;}
								if(eq_day.indexOf("2")>-1){tue[q]=0;}
								if(eq_day.indexOf("3")>-1){wedn[q]=0;}
								if(eq_day.indexOf("4")>-1){thur[q]=0;}
								if(eq_day.indexOf("5")>-1){fir[q]=0;}
								if(eq_day.indexOf("6")>-1){sat[q]=0;}
							} 
						}else{
							m_jsondata=m_jsondata+',{"days":['+eq_day+'],"start_minute":'+start_time+',"end_minute":'+end_time+'}';
							start_time=-1;
							day_not="";
							for(q=end_spot; q>=start_spot; q--){
								sun[q]=0;
								if(eq_day.indexOf("1")>-1){mon[q]=0;}
								if(eq_day.indexOf("2")>-1){tue[q]=0;}
								if(eq_day.indexOf("3")>-1){wedn[q]=0;}
								if(eq_day.indexOf("4")>-1){thur[q]=0;}
								if(eq_day.indexOf("5")>-1){fir[q]=0;}
								if(eq_day.indexOf("6")>-1){sat[q]=0;}
							} 
						}
					}
				}
			}
		}
	}
	eq_day="";
	day_not="";
	start_time=-1;
	for(m=0; m<7; m++){
		for(z=0; z<24; z++){
			if(mon[z]==1){
				if(start_time==-1){
					if(z==0){start_time=0; start_spot=0;}else{start_time=z*60; start_spot=z;}				
				}
				if(except_day[m]==8){
					if(eq_day.indexOf("1")==-1){eq_day="1";}
					if(mon[z]==tue[z]){if(eq_day.indexOf("2")==-1){eq_day=eq_day+",2"}}else{day_not=day_not+",2";}
					if(mon[z]==wedn[z]){if(eq_day.indexOf("3")==-1){eq_day=eq_day+",3"}}else{day_not=day_not+",3";}
					if(mon[z]==thur[z]){if(eq_day.indexOf("4")==-1){eq_day=eq_day+",4"}}else{day_not=day_not+",4";}
					if(mon[z]==fir[z]){if(eq_day.indexOf("5")==-1){eq_day=eq_day+",5"}}else{day_not=day_not+",5";}
					if(mon[z]==sat[z]){if(eq_day.indexOf("6")==-1){eq_day=eq_day+",6"}}else{day_not=day_not+",6";}
					
					if(mon[Number(z)-1]!=tue[Number(z)-1]){day_not=day_not+",2";}
					if(mon[Number(z)-1]!=wedn[Number(z)-1]){day_not=day_not+",3";}
					if(mon[Number(z)-1]!=thur[Number(z)-1]){day_not=day_not+",4";}
					if(mon[Number(z)-1]!=fir[Number(z)-1]){day_not=day_not+",5";}
					if(mon[Number(z)-1]!=sat[Number(z)-1]){day_not=day_not+",6";}
					
				}
			}else if((mon[Number(z)-1]==1) && (mon[z]==0)){
				end_time=z*60;
				end_spot=z;
				if(((day_not.indexOf("2") > -1) && (eq_day.indexOf("2") > -1)) || (tue[z]==1)){eq_day=eq_day.replace(",2","");}
				if(((day_not.indexOf("3") > -1) && (eq_day.indexOf("3") > -1)) || (wedn[z]==1)){eq_day=eq_day.replace(",3","");}
				if(((day_not.indexOf("4") > -1) && (eq_day.indexOf("4") > -1)) || (thur[z]==1)){eq_day=eq_day.replace(",4","");}
				if(((day_not.indexOf("5") > -1) && (eq_day.indexOf("5") > -1)) || (fir[z]==1)){eq_day=eq_day.replace(",5","");}
				if(((day_not.indexOf("6") > -1) && (eq_day.indexOf("6") > -1)) || (sat[z]==1)){eq_day=eq_day.replace(",6","");}
				
				if((m_jsondata=="")||(m_jsondata==null)){
					m_jsondata='{"days":['+eq_day+'],"start_minute":'+start_time+',"end_minute":'+end_time+'}';
					start_time=-1;
					day_not="";
					for(q=end_spot; q>=start_spot; q--){
						mon[q]=0;
						if(eq_day.indexOf("2")>-1){tue[q]=0;}
						if(eq_day.indexOf("3")>-1){wedn[q]=0;}
						if(eq_day.indexOf("4")>-1){thur[q]=0;}
						if(eq_day.indexOf("5")>-1){fir[q]=0;}
						if(eq_day.indexOf("6")>-1){sat[q]=0;}
					}
				}else{
					m_jsondata=m_jsondata+',{"days":['+eq_day+'],"start_minute":'+start_time+',"end_minute":'+end_time+'}';
					start_time=-1;
					day_not="";
					for(q=end_spot; q>=start_spot; q--){
						mon[q]=0;
						if(eq_day.indexOf("2")>-1){tue[q]=0;}
						if(eq_day.indexOf("3")>-1){wedn[q]=0;}
						if(eq_day.indexOf("4")>-1){thur[q]=0;}
						if(eq_day.indexOf("5")>-1){fir[q]=0;}
						if(eq_day.indexOf("6")>-1){sat[q]=0;}
					}
				}
			} 
			if(z==23){
				if(mon[z]==1){
					end_time=1440;
					end_spot=z;
					if((day_not.indexOf("2") > -1) && (eq_day.indexOf("2") > -1)){eq_day=eq_day.replace(",2","");}
					if((day_not.indexOf("3") > -1) && (eq_day.indexOf("3") > -1)){eq_day=eq_day.replace(",3","");}
					if((day_not.indexOf("4") > -1) && (eq_day.indexOf("4") > -1)){eq_day=eq_day.replace(",4","");}
					if((day_not.indexOf("5") > -1) && (eq_day.indexOf("5") > -1)){eq_day=eq_day.replace(",5","");}
					if((day_not.indexOf("6") > -1) && (eq_day.indexOf("6") > -1)){eq_day=eq_day.replace(",6","");}
					
					if(m==6){
						if((m_jsondata=="")||(m_jsondata==null)){
							m_jsondata='{"days":['+eq_day+'],"start_minute":'+start_time+',"end_minute":'+end_time+'}';
							start_time=-1;
							day_not="";
							 for(q=end_spot; q>=start_spot; q--){
								mon[q]=0;
								if(eq_day.indexOf("2")>-1){tue[q]=0;}
								if(eq_day.indexOf("3")>-1){wedn[q]=0;}
								if(eq_day.indexOf("4")>-1){thur[q]=0;}
								if(eq_day.indexOf("5")>-1){fir[q]=0;}
								if(eq_day.indexOf("6")>-1){sat[q]=0;}
							} 
						}else{
							m_jsondata=m_jsondata+',{"days":['+eq_day+'],"start_minute":'+start_time+',"end_minute":'+end_time+'}';
							start_time=-1;
							day_not="";
							for(q=end_spot; q>=start_spot; q--){
								mon[q]=0;
								if(eq_day.indexOf("2")>-1){tue[q]=0;}
								if(eq_day.indexOf("3")>-1){wedn[q]=0;}
								if(eq_day.indexOf("4")>-1){thur[q]=0;}
								if(eq_day.indexOf("5")>-1){fir[q]=0;}
								if(eq_day.indexOf("6")>-1){sat[q]=0;}
							} 
						}
					}
				}
			}
		}
	}
	eq_day="";
	day_not="";
	start_time=-1;
	for(m=0; m<7; m++){
		for(var z=0; z<24; z++){
			if(tue[z]==1){
				if(start_time==-1){
					if(z==0){start_time=0; start_spot=0;}else{start_time=z*60; start_spot=z;}				
				}
				if(except_day[m]==8){
					if(eq_day.indexOf("2")==-1){eq_day="2";}	
					if(tue[z]==wedn[z]){if(eq_day.indexOf("3")==-1){eq_day=eq_day+",3"}}else{day_not=day_not+",3";}
					if(tue[z]==thur[z]){if(eq_day.indexOf("4")==-1){eq_day=eq_day+",4"}}else{day_not=day_not+",4";}
					if(tue[z]==fir[z]){if(eq_day.indexOf("5")==-1){eq_day=eq_day+",5"}}else{day_not=day_not+",5";}
					if(tue[z]==sat[z]){if(eq_day.indexOf("6")==-1){eq_day=eq_day+",6"}}else{day_not=day_not+",6";}
					
					if(tue[Number(z)-1]!=wedn[Number(z)-1]){day_not=day_not+",3";}
					if(tue[Number(z)-1]!=thur[Number(z)-1]){day_not=day_not+",4";}
					if(tue[Number(z)-1]!=fir[Number(z)-1]){day_not=day_not+",5";}
					if(tue[Number(z)-1]!=sat[Number(z)-1]){day_not=day_not+",6";}
				}
			}else if((tue[Number(z)-1]==1) && (tue[z]==0)){
				end_time=z*60;
				end_spot=z;
				if(((day_not.indexOf("3") > -1) && (eq_day.indexOf("3") > -1)) || (wedn[z]==1)){eq_day=eq_day.replace(",3","");}
				if(((day_not.indexOf("4") > -1) && (eq_day.indexOf("4") > -1)) || (thur[z]==1)){eq_day=eq_day.replace(",4","");}
				if(((day_not.indexOf("5") > -1) && (eq_day.indexOf("5") > -1)) || (fir[z]==1)){eq_day=eq_day.replace(",5","");}
				if(((day_not.indexOf("6") > -1) && (eq_day.indexOf("6") > -1)) || (sat[z]==1)){eq_day=eq_day.replace(",6","");}
				
				if((m_jsondata=="")||(m_jsondata==null)){
					m_jsondata='{"days":['+eq_day+'],"start_minute":'+start_time+',"end_minute":'+end_time+'}';
					start_time=-1;
					day_not="";
					for(q=end_spot; q>=start_spot; q--){
						tue[q]=0;
						if(eq_day.indexOf("3")>-1){wedn[q]=0;}
						if(eq_day.indexOf("4")>-1){thur[q]=0;}
						if(eq_day.indexOf("5")>-1){fir[q]=0;}
						if(eq_day.indexOf("6")>-1){sat[q]=0;}
					}
				}else{
					m_jsondata=m_jsondata+',{"days":['+eq_day+'],"start_minute":'+start_time+',"end_minute":'+end_time+'}';
					start_time=-1;
					day_not="";
					for(q=end_spot; q>=start_spot; q--){
						tue[q]=0;
						if(eq_day.indexOf("3")>-1){wedn[q]=0;}
						if(eq_day.indexOf("4")>-1){thur[q]=0;}
						if(eq_day.indexOf("5")>-1){fir[q]=0;}
						if(eq_day.indexOf("6")>-1){sat[q]=0;}
					}
				}
			} 
			if(z==23){
				if(tue[z]==1){
					end_time=1440;
					end_spot=z;
					if((day_not.indexOf("3") > -1) && (eq_day.indexOf("3") > -1)){eq_day=eq_day.replace(",3","");}
					if((day_not.indexOf("4") > -1) && (eq_day.indexOf("4") > -1)){eq_day=eq_day.replace(",4","");}
					if((day_not.indexOf("5") > -1) && (eq_day.indexOf("5") > -1)){eq_day=eq_day.replace(",5","");}
					if((day_not.indexOf("6") > -1) && (eq_day.indexOf("6") > -1)){eq_day=eq_day.replace(",6","");}
					
					if(m==6){
						if((m_jsondata=="")||(m_jsondata==null)){
							m_jsondata='{"days":['+eq_day+'],"start_minute":'+start_time+',"end_minute":'+end_time+'}';
							start_time=-1;
							day_not="";
							 for(q=end_spot; q>=start_spot; q--){
								 tue[q]=0;
								if(eq_day.indexOf("3")>-1){wedn[q]=0;}
								if(eq_day.indexOf("4")>-1){thur[q]=0;}
								if(eq_day.indexOf("5")>-1){fir[q]=0;}
								if(eq_day.indexOf("6")>-1){sat[q]=0;}
							} 
						}else{
							m_jsondata=m_jsondata+',{"days":['+eq_day+'],"start_minute":'+start_time+',"end_minute":'+end_time+'}';
							start_time=-1;
							day_not="";
							for(q=end_spot; q>=start_spot; q--){
								tue[q]=0;
								if(eq_day.indexOf("3")>-1){wedn[q]=0;}
								if(eq_day.indexOf("4")>-1){thur[q]=0;}
								if(eq_day.indexOf("5")>-1){fir[q]=0;}
								if(eq_day.indexOf("6")>-1){sat[q]=0;}
							} 
						}
					}
				}
			}
		}
	}
	eq_day="";
	day_not="";
	start_time=-1;
	for(m=0; m<7; m++){
		for(var z=0; z<24; z++){
			if(wedn[z]==1){
				if(start_time==-1){
					if(z==0){start_time=0; start_spot=0;}else{start_time=z*60; start_spot=z;}				
				}
				if(except_day[m]==8){
					if(eq_day.indexOf("3")==-1){eq_day="3";}	
					if(wedn[z]==thur[z]){if(eq_day.indexOf("4")==-1){eq_day=eq_day+",4"}}else{day_not=day_not+",4";}
					if(wedn[z]==fir[z]){if(eq_day.indexOf("5")==-1){eq_day=eq_day+",5"}}else{day_not=day_not+",5";}
					if(wedn[z]==sat[z]){if(eq_day.indexOf("6")==-1){eq_day=eq_day+",6"}}else{day_not=day_not+",6";}
					
					if(wedn[Number(z)-1]!=thur[Number(z)-1]){day_not=day_not+",4";}
					if(wedn[Number(z)-1]!=fir[Number(z)-1]){day_not=day_not+",5";}
					if(wedn[Number(z)-1]!=sat[Number(z)-1]){day_not=day_not+",6";}
				}
			}else if((wedn[Number(z)-1]==1) && (wedn[z]==0)){
				end_time=z*60;
				end_spot=z;
				if(((day_not.indexOf("4") > -1) && (eq_day.indexOf("4") > -1)) || (thur[z]==1)){eq_day=eq_day.replace(",4","");}
				if(((day_not.indexOf("5") > -1) && (eq_day.indexOf("5") > -1)) || (fir[z]==1)){eq_day=eq_day.replace(",5","");}
				if(((day_not.indexOf("6") > -1) && (eq_day.indexOf("6") > -1)) || (sat[z]==1)){eq_day=eq_day.replace(",6","");}
				
				if((m_jsondata=="")||(m_jsondata==null)){
					m_jsondata='{"days":['+eq_day+'],"start_minute":'+start_time+',"end_minute":'+end_time+'}';
					start_time=-1;
					day_not="";
					for(q=end_spot; q>=start_spot; q--){
						wedn[q]=0;
						if(eq_day.indexOf("4")>-1){thur[q]=0;}
						if(eq_day.indexOf("5")>-1){fir[q]=0;}
						if(eq_day.indexOf("6")>-1){sat[q]=0;}
					}
				}else{
					m_jsondata=m_jsondata+',{"days":['+eq_day+'],"start_minute":'+start_time+',"end_minute":'+end_time+'}';
					start_time=-1;
					day_not="";
					for(q=end_spot; q>=start_spot; q--){
						wedn[q]=0;
						if(eq_day.indexOf("4")>-1){thur[q]=0;}
						if(eq_day.indexOf("5")>-1){fir[q]=0;}
						if(eq_day.indexOf("6")>-1){sat[q]=0;}
					}
				}
			}
			if(z==23){
				if(wedn[z]==1){
					end_time=1440;
					end_spot=z;
					if((day_not.indexOf("4") > -1) && (eq_day.indexOf("4") > -1)){eq_day=eq_day.replace(",4","");}
					if((day_not.indexOf("5") > -1) && (eq_day.indexOf("5") > -1)){eq_day=eq_day.replace(",5","");}
					if((day_not.indexOf("6") > -1) && (eq_day.indexOf("6") > -1)){eq_day=eq_day.replace(",6","");}
					
					if(m==6){
						if((m_jsondata=="")||(m_jsondata==null)){
							m_jsondata='{"days":['+eq_day+'],"start_minute":'+start_time+',"end_minute":'+end_time+'}';
							start_time=-1;
							day_not="";
							 for(q=end_spot; q>=start_spot; q--){
								 wedn[q]=0;
								if(eq_day.indexOf("4")>-1){thur[q]=0;}
								if(eq_day.indexOf("5")>-1){fir[q]=0;}
								if(eq_day.indexOf("6")>-1){sat[q]=0;}
							} 
						}else{
							m_jsondata=m_jsondata+',{"days":['+eq_day+'],"start_minute":'+start_time+',"end_minute":'+end_time+'}';
							start_time=-1;
							day_not="";
							for(q=end_spot; q>=start_spot; q--){
								wedn[q]=0;
								if(eq_day.indexOf("4")>-1){thur[q]=0;}
								if(eq_day.indexOf("5")>-1){fir[q]=0;}
								if(eq_day.indexOf("6")>-1){sat[q]=0;}
							} 
						}
					}
				}
			}
		}
	}
	eq_day="";
	day_not="";
	start_time=-1;
	for(m=0; m<7; m++){
		for(var z=0; z<24; z++){
			if(thur[z]==1){
				if(start_time==-1){
					if(z==0){start_time=0; start_spot=0;}else{start_time=z*60; start_spot=z;}				
				}
				if(except_day[m]==8){
					if(eq_day.indexOf("4")==-1){eq_day="4";}	
					if(thur[z]==fir[z]){if(eq_day.indexOf("5")==-1){eq_day=eq_day+",5"}}else{day_not=day_not+",5";}
					if(thur[z]==sat[z]){if(eq_day.indexOf("6")==-1){eq_day=eq_day+",6"}}else{day_not=day_not+",6";}
					
					if(thur[Number(z)-1]!=fir[Number(z)-1]){day_not=day_not+",5";}
					if(thur[Number(z)-1]!=sat[Number(z)-1]){day_not=day_not+",6";}
				}
			}else if((thur[Number(z)-1]==1) && (thur[z]==0)){
				end_time=z*60;
				end_spot=z;
				if(((day_not.indexOf("5") > -1) && (eq_day.indexOf("5") > -1)) || (fir[z]==1)){eq_day=eq_day.replace(",5","");}
				if(((day_not.indexOf("6") > -1) && (eq_day.indexOf("6") > -1)) || (sat[z]==1)){eq_day=eq_day.replace(",6","");}
				
				if((m_jsondata=="")||(m_jsondata==null)){
					m_jsondata='{"days":['+eq_day+'],"start_minute":'+start_time+',"end_minute":'+end_time+'}';
					start_time=-1;
					day_not="";
					for(q=end_spot; q>=start_spot; q--){
						thur[q]=0;
						if(eq_day.indexOf("5")>-1){fir[q]=0;}
						if(eq_day.indexOf("6")>-1){sat[q]=0;}
					}
				}else{
					m_jsondata=m_jsondata+',{"days":['+eq_day+'],"start_minute":'+start_time+',"end_minute":'+end_time+'}';
					start_time=-1;
					day_not="";
					for(q=end_spot; q>=start_spot; q--){
						thur[q]=0;
						if(eq_day.indexOf("5")>-1){fir[q]=0;}
						if(eq_day.indexOf("6")>-1){sat[q]=0;}
					}
				}
			}
			if(z==23){
				if(thur[z]==1){
					end_time=1440;
					end_spot=z;
					if((day_not.indexOf("5") > -1) && (eq_day.indexOf("5") > -1)){eq_day=eq_day.replace(",5","");}
					if((day_not.indexOf("6") > -1) && (eq_day.indexOf("6") > -1)){eq_day=eq_day.replace(",6","");}
					
					if(m==6){
						if((m_jsondata=="")||(m_jsondata==null)){
							m_jsondata='{"days":['+eq_day+'],"start_minute":'+start_time+',"end_minute":'+end_time+'}';
							start_time=-1;
							day_not="";
							 for(q=end_spot; q>=start_spot; q--){
								 thur[q]=0;
								if(eq_day.indexOf("5")>-1){fir[q]=0;}
								if(eq_day.indexOf("6")>-1){sat[q]=0;}
							} 
						}else{
							m_jsondata=m_jsondata+',{"days":['+eq_day+'],"start_minute":'+start_time+',"end_minute":'+end_time+'}';
							start_time=-1;
							day_not="";
							for(q=end_spot; q>=start_spot; q--){
								thur[q]=0;
								if(eq_day.indexOf("5")>-1){fir[q]=0;}
								if(eq_day.indexOf("6")>-1){sat[q]=0;}
							} 
						}
					}
				}
			}
		}
	}
	eq_day="";
	day_not="";
	start_time=-1;
	for(m=0; m<7; m++){
		for(var z=0; z<24; z++){
			if(fir[z]==1){
				if(start_time==-1){
					if(z==0){start_time=0; start_spot=0;}else{start_time=z*60; start_spot=z;}				
				}
				if(except_day[m]==8){
					if(eq_day.indexOf("5")==-1){eq_day="5";}	
					if(fir[z]==sat[z]){if(eq_day.indexOf("6")==-1){eq_day=eq_day+",6"}}else{day_not=day_not+",6";}
					
					if(fir[Number(z)-1]!=sat[Number(z)-1]){day_not=day_not+",6";}
				}
			}else if((fir[Number(z)-1]==1) && (fir[z]==0)){
				end_time=z*60;
				end_spot=z;
				if(((day_not.indexOf("6") > -1) && (eq_day.indexOf("6") > -1)) || (sat[z]==1)){eq_day=eq_day.replace(",6","");}
				
				if((m_jsondata=="")||(m_jsondata==null)){
					m_jsondata='{"days":['+eq_day+'],"start_minute":'+start_time+',"end_minute":'+end_time+'}';
					start_time=-1;
					day_not="";
					for(q=end_spot; q>=start_spot; q--){
						fir[q]=0;
						if(eq_day.indexOf("6")>-1){sat[q]=0;}
					}
				}else{
					m_jsondata=m_jsondata+',{"days":['+eq_day+'],"start_minute":'+start_time+',"end_minute":'+end_time+'}';
					start_time=-1;
					day_not="";
					for(q=end_spot; q>=start_spot; q--){
						fir[q]=0;
						if(eq_day.indexOf("6")>-1){sat[q]=0;}
					}
				}
			}
			if(z==23){
				if(fir[z]==1){
					end_time=1440;
					end_spot=z;
					if((day_not.indexOf("6") > -1) && (eq_day.indexOf("6") > -1)){eq_day=eq_day.replace(",6","");}
					
					if(m==6){
						if((m_jsondata=="")||(m_jsondata==null)){
							m_jsondata='{"days":['+eq_day+'],"start_minute":'+start_time+',"end_minute":'+end_time+'}';
							start_time=-1;
							day_not="";
							 for(q=end_spot; q>=start_spot; q--){
								 fir[q]=0;
								if(eq_day.indexOf("6")>-1){sat[q]=0;}
							} 
						}else{
							m_jsondata=m_jsondata+',{"days":['+eq_day+'],"start_minute":'+start_time+',"end_minute":'+end_time+'}';
							start_time=-1;
							day_not="";
							for(q=end_spot; q>=start_spot; q--){
								fir[q]=0;
								if(eq_day.indexOf("6")>-1){sat[q]=0;}
							} 
						}
					}
				}
			}
		}
	}
	eq_day="";
	day_not="";
	start_time=-1;
	for(m=0; m<7; m++){
		for(var z=0; z<24; z++){
			if(sat[z]==1){
				if(start_time==-1){
					if(z==0){start_time=0; start_spot=0;}else{start_time=z*60; start_spot=z;}				
				}
				if(except_day[m]==8){
					if(eq_day.indexOf("6")==-1){eq_day="6";}	
				}
			}else if((sat[Number(z)-1]==1) && (sat[z]==0)){
				end_time=z*60;
				end_spot=z;
				if((m_jsondata=="")||(m_jsondata==null)){
					m_jsondata='{"days":['+eq_day+'],"start_minute":'+start_time+',"end_minute":'+end_time+'}';
					start_time=-1;
					day_not="";
					for(q=end_spot; q>=start_spot; q--){
						sat[q]=0;
					}
				}else{
					m_jsondata=m_jsondata+',{"days":['+eq_day+'],"start_minute":'+start_time+',"end_minute":'+end_time+'}';
					start_time=-1;
					day_not="";
					for(q=end_spot; q>=start_spot; q--){
						sat[q]=0;
					}
				}
			}
			if(z==23){
				if(sat[z]==1){
					end_time=1440;
					end_spot=z;
					if(m==6){
						if((m_jsondata=="")||(m_jsondata==null)){
							m_jsondata='{"days":['+eq_day+'],"start_minute":'+start_time+',"end_minute":'+end_time+'}';
							start_time=-1;
							day_not="";
							 for(q=end_spot; q>=start_spot; q--){
								 sat[q]=0;
							} 
						}else{
							m_jsondata=m_jsondata+',{"days":['+eq_day+'],"start_minute":'+start_time+',"end_minute":'+end_time+'}';
							start_time=-1;
							day_not="";
							for(q=end_spot; q>=start_spot; q--){
								sat[q]=0;
							} 
						}
					}
				}
			}
		}
	}
	total_jsondata=total_jsondata+m_jsondata;
	if(total_jsondata==""){
		total_jsondata="";
	}else{
		total_jsondata = JSON.stringify(total_jsondata);
		$("#expose_time_day").val(expose_time_day);
	}
	$("#schedule_data").val(total_jsondata);
}