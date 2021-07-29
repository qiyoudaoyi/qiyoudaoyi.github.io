const defaultNameSrting =
`Chasing our dream(COD)
殿殿
渣渣的肥肥動物園
打排不打牌
舔糕羞搖麻演
陳麒安帶我飛
紐奧良烤雞腿
心瑤說的隊
杜威廷是大帥哥
小寶想你了
YCF
NTHU
吸吧嚕嗎
94pi孩
DS皮球天團
禿毛吉娃娃
我的很大你忍一下
一口炸雞一隻大喇叭
帥哥戰隊
用學分換電競夢
冉花餅
SPT Team
穎哥不戳 永恆傳說
Inferno
我在你後面
對你施展可愛魔法
我可以陪你去看星星
vitory
對對對對對對對對對
大瑞米之劍
晚安 剛睡醒
ALMNH
Ahoy
照燈綠帽帽大人
猜猜我是誰
三峽大學店
我們輔助臭低端
好氣喔
ÄÑħ掉星團
123
ACT
隨心`
const defaultNames = defaultNameSrting.split('\n');

class TeamData {
    constructor(number, name) {
        this.number = number;
        this.name = name;
    }
}

const teamTable = document.getElementById("team-table");
const teamCells = teamTable.getElementsByTagName("td");
const confirmBtn = document.getElementById("confirm-btn");
const teamsData = [];

const leftContainer = document.getElementsByClassName("left-container")[0];
const drawBtn = document.getElementById("draw-btn");
const lastDrown = document.getElementById("last-drown");
const undrownTable = document.getElementById("undrown-table");

var draws = 0, numberDrown = 0;

window.onload = () => {
    const tbodyNode = document.createElement("tbody");

    for(var i = 0; i <= 15; i++) {
        const trNode = document.createElement("tr");
        trNode.innerHTML =
            `<td>${2 * i + 1}</td>
            <td contentEditable="true">${defaultNames[2 * i + 1]}</td>
            <td>${2 * i + 2}</td>
            <td contentEditable="true">${defaultNames[2 * i + 2]}</td>`;
        tbodyNode.appendChild(trNode);
    }
    teamTable.appendChild(tbodyNode);
    leftContainer.style.display = 'none';
}

confirmBtn.addEventListener("click", () => {
    const tbodyNode = document.createElement("tbody");

    confirmBtn.remove();
    for (i = 0; i < 16; i += 1) {
        teamsData[2 * i] = new TeamData(0, teamCells[4 * i + 1].innerText);
        teamsData[2 * i + 1] = new TeamData(0, teamCells[4 * i + 3].innerText);
        switch (Math.floor(i / 2)) {
            case 0: group = 'A';    break;
            case 1: group = 'B';    break;
            case 2: group = 'C';    break;
            case 3: group = 'D';    break;
            case 4: group = 'E';    break;
            case 5: group = 'F';    break;
            case 6: group = 'G';    break;
            case 7: group = 'H';
        }
        teamCells[4 * i].innerHTML = group + (2 * i + 1);
        teamCells[4 * i + 1].contentEditable = false;
        teamCells[4 * i + 1].innerHTML = '';
        teamCells[4 * i + 2].innerHTML = group + (2 * i + 2);
        teamCells[4 * i + 3].contentEditable = false;
        teamCells[4 * i + 3].innerHTML = '';

        const trNode_1 = document.createElement("tr");
        const trNode_2 = document.createElement("tr");
        trNode_1.innerHTML = `<td>${teamsData[2 * i].name}</td>`
        trNode_2.innerHTML = `<td>${teamsData[2 * i + 1].name}</td>`
        tbodyNode.appendChild(trNode_1);
        tbodyNode.appendChild(trNode_2);
    }
    undrownTable.appendChild(tbodyNode);
    leftContainer.style.display = 'flex';
    teamTable.style.height = '100%'
    lastDrown.innerHTML = `<div>抽出的隊伍會顯示在此</div>`;
})

drawBtn.addEventListener("click", () => {
    if (draws++ < 32) {
        numberDrown = Math.floor(Math.random() * (32 - draws + 1));
        teamsData[numberDrown].number = draws;
        teamsData.sort((a, b) => { return a.number - b.number });
        UpdateTables();
    } else if (draws == 33) {
        lastDrown.innerHTML = `<div>所有隊伍皆已完成抽籤！</div>`;
    } else {
        leftContainer.style.display = 'none';
    }
});

const UpdateTables = () => {
    const cursorRow = Math.floor((draws - 1) / 2);
    const cursorCol = draws % 2 ? 1 : 3;
    const drownBody = teamTable.getElementsByTagName("tbody")[0];
    const cursor = drownBody.childNodes[cursorRow].getElementsByTagName("td")[cursorCol];

    undrownTable.getElementsByTagName("tbody")[0].childNodes[numberDrown].remove();
    cursor.innerHTML = `${teamsData[32 - 1].name}`;
    if (lastDrown.innerHTML == `<div>抽出的隊伍會顯示在此</div>`) {
        lastDrown.innerHTML =
            `<div>本次抽到的隊伍</div><div>${cursor.innerHTML}</div>`
    } else {
        lastDrown.lastChild.innerHTML = `${cursor.innerHTML}`
    }
}