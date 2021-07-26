const drawOneBtn = document.getElementById("draw-one-btn");
const lastDrownTeam = document.getElementById("last-drown-team");
const undrownTeamTable = document.getElementById("undrown-team-tbody");
const drownTeamTable = document.getElementById("drown-team-tbody");
const ALL_TEAMS = [
    {"teamNumber": 0, "teamName": "第一隊隊名"},
    {"teamNumber": 0, "teamName": "第二隊隊名"},
    {"teamNumber": 0, "teamName": "第三隊隊名"},
    {"teamNumber": 0, "teamName": "第四隊隊名"},
    {"teamNumber": 0, "teamName": "第五隊隊名"},
    {"teamNumber": 0, "teamName": "第六隊隊名"},
    {"teamNumber": 0, "teamName": "第七隊隊名"},
    {"teamNumber": 0, "teamName": "第八隊隊名"},
    {"teamNumber": 0, "teamName": "第九隊隊名"},
    {"teamNumber": 0, "teamName": "第十隊隊名"},
    {"teamNumber": 0, "teamName": "第十一隊隊名"},
    {"teamNumber": 0, "teamName": "第十二隊隊名"},
    {"teamNumber": 0, "teamName": "第十三隊隊名"},
    {"teamNumber": 0, "teamName": "第十四隊隊名"},
    {"teamNumber": 0, "teamName": "第十五隊隊名"},
    {"teamNumber": 0, "teamName": "第十六隊隊名"},
    {"teamNumber": 0, "teamName": "第十七隊隊名"},
    {"teamNumber": 0, "teamName": "第十八隊隊名"},
    {"teamNumber": 0, "teamName": "第十九隊隊名"},
    {"teamNumber": 0, "teamName": "第二十隊隊名"},
    {"teamNumber": 0, "teamName": "第二十一隊隊名"},
    {"teamNumber": 0, "teamName": "第二十二隊隊名"},
    {"teamNumber": 0, "teamName": "第二十三隊隊名"},
    {"teamNumber": 0, "teamName": "第二十四隊隊名"},
    {"teamNumber": 0, "teamName": "第二十五隊隊名"},
    {"teamNumber": 0, "teamName": "第二十六隊隊名"},
    {"teamNumber": 0, "teamName": "第二十七隊隊名"},
    {"teamNumber": 0, "teamName": "第二十八隊隊名"},
    {"teamNumber": 0, "teamName": "第二十九隊隊名"},
    {"teamNumber": 0, "teamName": "第三十隊隊名"},
    {"teamNumber": 0, "teamName": "第三十一隊隊名"},
    {"teamNumber": 0, "teamName": "第三十二隊隊名"},
];
const numberOfTeams = ALL_TEAMS.length;
var draws = 0, numberDrown = 0;

window.onload = () => {
    for(i = 0; i < numberOfTeams; i++) {
        const trNode = document.createElement("TR");
        trNode.innerHTML = `<td>${ALL_TEAMS[i].teamName}</td>`;
        undrownTeamTable.appendChild(trNode);
        if (i % 2 == 0) {
            const trNode = document.createElement("TR");
            trNode.innerHTML =
                `<td>${i + 1}</td><td></td><td>${i + 2}</td><td></td>`;
            drownTeamTable.appendChild(trNode);
        }
    }
    lastDrownTeam.innerHTML = `<div>抽出的隊伍會顯示在此</div>`;
}

drawOneBtn.addEventListener("click", () => { drawOneTeam() });


const drawOneTeam = () => {
    if (draws++ < numberOfTeams) {
        numberDrown = Math.floor(Math.random() * (numberOfTeams - draws + 1));
        ALL_TEAMS[numberDrown].teamNumber = draws;
        ALL_TEAMS.sort((a, b) => { return a.teamNumber - b.teamNumber });
        UpdateTables();
    } else {
        lastDrownTeam.innerHTML = `<div>所有隊伍皆已完成抽籤！</div>`;
    }
}

const UpdateTables = () => {
    const cursorRow = Math.floor((draws - 1) / 2);
    const cursorCol = draws % 2 ? 1 : 3;
    const cursor = drownTeamTable.childNodes[cursorRow].childNodes[cursorCol];

    undrownTeamTable.childNodes[numberDrown].remove();
    cursor.innerHTML = `${ALL_TEAMS[numberOfTeams - 1].teamName}`;
    if (lastDrownTeam.innerHTML == `<div>抽出的隊伍會顯示在此</div>`) {
        lastDrownTeam.innerHTML =
            `<div>本次抽到的隊伍: </div><div>${cursor.innerHTML}</div>`
    } else {
        lastDrownTeam.lastChild.innerHTML = `${cursor.innerHTML}`
    }
}