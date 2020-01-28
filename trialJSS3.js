ans ={};

function LoadFile(FileName,RespType,FileType,RunMe,y){
	$.ajax({
		type: "POST",
		url: "testing3.csv",
		dataType: "text",
		success:function(response){
					RunMe(response,y);
				},
				error: function(jqXHR, textStatus, error){
					console.log('textStatus:', textStatus);
					console.log('error:',error);
					console.log('jqXHR:',jqXHR);
				}
		});
}
			
function csvToArray (csv) {
    rows = csv.split("\n");
	return rows.map(function (row) {
       	return row.split(",");
	});
}
			
function TracerOn(X,y){
	val = [];
	var arr = csvToArray(X);
	var objData = [];
	for(var j=1;j<arr.length;j++){
		objData[j-1] = {};
		for(var k=0;k<arr[0].length && k<arr[j].length;k++){
			var key = arr[0][k];
			objData[j-1][key] = arr[j][k]
		}
	}
	var jsonData = JSON.stringify(objData);
	js = JSON.parse(jsonData);
	var node = document.getElementById("demo1");
	var arrTemp = [];
	for(var i=0;i<js.length-1;i++){
		if(arrTemp.indexOf(js[i].Platform)==-1){
			node.innerHTML += '<option value="' + js[i].Platform + '">' + js[i].Platform + '</option>';
			arrTemp.push(js[i].Platform);
		}	
	}
	/*var node1 = document.getElementById("texttry");
	node1.innerHTML = X;*/
}

function TracerOn1(X,y){
	var arr = csvToArray(X);
	var node = document.getElementById("demo2");
	val.push(y);
	ans.Platform = y;
	//var node1 = document.getElementById("texttry");
	var arrTemp = [];
	for(var i=0;i<=arr.length;i++){
		if(js[i].Platform == y && arrTemp.indexOf(js[i].StorageTier)==-1){
			node.innerHTML += '<option value="' + js[i].StorageTier + '">' + js[i].StorageTier + '</option>'; 
			arrTemp.push(js[i].StorageTier);
			//node1.innerHTML += js[i].Storage_Tier;
		}
	}
}

function TracerOn2(X,y){
	$("#demo4").empty();
	$("#demo4").html("<option selected='selected' disabled='disabled' hidden='true'</option>");
	document.getElementById("demo4").innerHTML += "<option disabled='disabled'>Select OSD Drives</option>";
	val.push(y);
	ans.StorageTier = y;
	var arr = csvToArray(X);
	var node = document.getElementById("demo4");
	var node1 = document.getElementById("texttry");
	var arrTemp = [];
	for(var i=0;i<=arr.length;i++){
		if(js[i].StorageTier == y && arrTemp.indexOf(js[i].OSDDrives)==-1){
			node.innerHTML += '<option value="' + js[i].OSDDrives + '">' + js[i].OSDDrives + '</option>'; 
			arrTemp.push(js[i].OSDDrives);
		}
	}
	TracerOnDataPro(X,y);
}
function TracerOnDataPro(X,y){
	$("#demo6").empty();
	$("#demo6").html("<option selected='selected' disabled='disabled' hidden='true'</option>");
	document.getElementById("demo6").innerHTML += "<option disabled='disabled'>Replication Factor</option>";
	var arr = csvToArray(X);
	node2 = document.getElementById("demo6");
	var arrTemp1 = [];
	for(var i=0;i<=arr.length;i++){
		if(js[i].StorageTier == y && arrTemp1.indexOf(js[i].DataProtectionTier)==-1){
			node2.innerHTML += '<option value="' + js[i].DataProtectionTier + '">' + js[i].DataProtectionTier + '</option>'; 
			arrTemp1.push(js[i].DataProtectionTier);
		}
	}
	return;
}

function TracerOn3(){
	val.push(document.getElementById("demo3").value);
	ans.CephStorageBackend = document.getElementById("demo3").value;
}

function TracerOn4(X,y){
	$("#demo11").empty();
	$("#demo11").html("<option selected='selected' disabled='disabled' hidden='true'</option>");
	document.getElementById("demo11").innerHTML += "<option disabled='disabled'>Select Journaling Drives Model</option>";
	var arr = csvToArray(X);
	var node = document.getElementById("demo11");
	var node1 = document.getElementById("texttry");
	var arrTemp = [];
	val.push(y);
	ans.OSDDrives = y;
	for(var i=0;i<=arr.length;i++){
		if(js[i].OSDDrives == y && arrTemp.indexOf(js[i].Journal)==-1){
			//alert(y);
			//alert(arr[i][2]);
			node.innerHTML += '<option value="' + js[i].Journal + '">' + js[i].Journal + '</option>'; 
			arrTemp.push(js[i].Journal);
		}
	}	
}

function TracerOn5(){
	val.push(document.getElementById("demo5").value);
	ans.NumberOfDisks = document.getElementById("demo5").value;
}

function TracerOn6(){
	val.push(document.getElementById("demo6").value);
	ans.DataProtectionTier = document.getElementById("demo6").value;
}

function TracerOn7(){
	val.push(document.getElementById("demo7").value);
	ans.Workload = document.getElementById("demo7").value;
}

function TracerOn8(){
	val.push(document.getElementById("demo8").value);
	ans.Block_Size = document.getElementById("demo8").value;
}

function TracerOn9(){
	val.push(document.getElementById("demo9").value);
	ans.RW = document.getElementById("demo9").value;
}

function TracerOn10(){
	val.push(document.getElementById("demo10").value);
}

function TracerOn11(x){
	val.push(document.getElementById("demo11").value);
	ans.Journal = document.getElementById("demo11").value;
}

/*function display(){
	var node = document.getElementById("texttry");
	for(var i=0;i<val.length;i++){
		node.innerHTML += "<p>" + val[i] + "</p>";
	}
}*/

function display(){
	var node = document.getElementById("dispdiv1");
	$("#dispdiv1").empty();
	$("#dispdiv2").empty();
	$("#dispdiv3").empty();
	var IOPS, latency, throughput, RawMem, opReserve, usableCapacity, dataProMem, noOfNodes, journalStorage, noOfJournals, CPU;
	var str="SAS HDD";
	for(var i=0;i<js.length-1;i++){
		if(js[i].Platform == ans.Platform){
			if(js[i].StorageTier == ans.StorageTier){
				if(js[i].CephStorageBackend == ans.CephStorageBackend){
					if(js[i].OSDDrives == ans.OSDDrives){
						if(js[i].DataProtectionTier == ans.DataProtectionTier){
							if(js[i].Workload == ans.Workload){
								if(js[i].RW == ans.RW){
									if(js[i].Block_Size == ans.Block_Size){
										if(js[i].Journal == ans.Journal){
											IOPS = js[i].Disks_IOPS * ans.NumberOfDisks;
											latency = js[i].Latency;
											throughput = js[i].Throughput;
											RawMem = Math.round(js[i].OSDDrivesMemory * ans.NumberOfDisks);
											opReserve = Math.round(0.05 * RawMem);
											usableCapacity = Math.ceil((((RawMem - opReserve) * js[i].R) + (((RawMem - opReserve) * js[i].W) / 3)));
											dataProMem = Math.ceil((RawMem - opReserve) - usableCapacity);
											noOfNodes = Math.ceil(ans.NumberOfDisks/12);
											if(noOfNodes<3)
												noOfNodes = 3;
											journalStorage = 0.04 * RawMem;
											noOfJournals = Math.ceil(journalStorage/js[i].JournalSize);
											document.getElementById("journalNo").value = noOfJournals;
											if(str.localeCompare(ans.StorageTier) == 0){

												CPU = ans.NumberOfDisks;
											}
											else
												CPU = ans.NumberOfDisks * 2;
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	node.innerHTML += "<table border='1' align='left' style='float: left' class='table table-hover'><tr><td>Raw Storage</td><td>" + Math.round(RawMem/1000) +"TB</td></tr><tr><td>Journal Storage</td><td>" + Math.ceil(journalStorage/1000) + "TB</td></tr><tr><td>Data Protection Overhead</td><td>" + Math.floor(dataProMem/1000) + "TB</td></tr><tr><td>Usable Storage</td><td>" + Math.floor(usableCapacity/1000) + "TB</td></tr><tr><td>Operational Reserve</td><td>" + Math.ceil(opReserve/1000) + "TB</tb></tr></table>";
	document.getElementById("dispdiv2").innerHTML += "<table border='1' align='center' style='float: left' class='table table-hover'><tr><td>Disks_IOPS</td><td>" + IOPS +"</td></tr><tr><td>Latency</td><td>" + latency + "</td></tr><tr><td>Throughput</td><td>" + throughput + "</td></tr></table>";
	document.getElementById("dispdiv3").innerHTML += "<table border='1' align='center' style='float: left' class='table table-hover'><tr><td>Storage Node Model</td><td>" + ans.Platform + "</td></tr><tr><td>Number of Nodes</td><td>" + noOfNodes + "</td></tr><tr><td>CPU</td><td>" + CPU + "GHz</td></tr><tr><td>Memory</td><td>" + ans.NumberOfDisks * 2 + "GB</td></tr><tr><td>OS</td></tr><tr><td>Data</td></tr><tr><td>Journaling</td></tr><tr><td>NIC Ports</td></tr></table>";
}