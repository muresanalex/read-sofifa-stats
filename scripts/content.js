chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    const data = request.data || {};
    const defaultValue = 50;

    const attacking = [
        "crossing",
        "finishing",
        "headingAcc",
        "shortPassing",
        "volleys"
    ];
    const skill = [
        "dribbling",
        "curve",
        "fkAccuracy",
        "longPassing",
        "ballControl"
    ];
    const movement = [
        "acceleration",
        "sprintSpeed",
        "agility",
        "reactions",
        "balance"
    ];
    const power = ["shotPower", "jumping", "stamina", "strength", "longShots"];
    const mentality = [
        "aggression",
        "interceptions",
        "positioning",
        "vision",
        "penalties",
        "composure"
    ];
    const defending = ["marking", "standingTackle", "slidingTackle"];
    const goalkeeping = [
        "gkDiving",
        "gkHandling",
        "gkKicking",
        "gkPositioning",
        "gkReflexes"
    ];
    const monthsMap = {
        Jan: 0,
        Feb: 1,
        Mar: 2,
        Apr: 3,
        May: 4,
        Jun: 5,
        Jul: 6,
        Aug: 7,
        Sep: 8,
        Oct: 9,
        Nov: 10,
        Dec: 11
    };

    const playerDetails = {};
    const meta = document.querySelector(".meta");
    const metaDetails = meta.lastChild.wholeText;
    const detailsArray = metaDetails.split(" ");
    const filteredArray = detailsArray.splice(2, 5);
    let [month, day, year, height, weight] = filteredArray;
    month = monthsMap[month.slice(1)];
    day = day.split(",")[0];
    year = year.slice(0, 4);
    height = parseInt(height.split("cm")[0], 10);
    weight = parseInt(weight.split("kg")[0], 10);
    const dateOfBirth = `${year}-${month}-${day}`;

    const position = meta.querySelectorAll("span")[0].innerHTML;

    const player = document.querySelector(".player");
    const firstColumn = player.querySelectorAll(".mb-2")[1];
    const secondColumn = player.querySelectorAll(".mb-2")[2];
    const attackingStats = firstColumn
        .querySelectorAll(".column")[0]
        .querySelector("ul");
    const skillStats = firstColumn
        .querySelectorAll(".column")[1]
        .querySelector("ul");
    const movementStats = firstColumn
        .querySelectorAll(".column")[2]
        .querySelector("ul");
    const powerStats = firstColumn
        .querySelectorAll(".column")[3]
        .querySelector("ul");
    const mentalityStats = secondColumn
        .querySelectorAll(".column")[0]
        .querySelector("ul");
    const defendingStats = secondColumn
        .querySelectorAll(".column")[1]
        .querySelector("ul");
    const goalkeepingStats = secondColumn
        .querySelectorAll(".column")[2]
        .querySelector("ul");

    function saveStats(accumulator, category, categoryStats) {
        category.forEach((item, index) => {
            accumulator[item] = categoryStats.querySelectorAll("span.label")[
                index
            ]
                ? parseInt(
                      categoryStats.querySelectorAll("span.label")[index]
                          .innerHTML,
                      10
                  )
                : defaultValue;
        });
    }

    saveStats(playerDetails, attacking, attackingStats);
    saveStats(playerDetails, skill, skillStats);
    saveStats(playerDetails, movement, movementStats);
    saveStats(playerDetails, power, powerStats);
    saveStats(playerDetails, mentality, mentalityStats);
    saveStats(playerDetails, defending, defendingStats);
    saveStats(playerDetails, goalkeeping, goalkeepingStats);
    playerDetails.height = height;
    playerDetails.weight = weight;
    playerDetails.dateOfBirth = dateOfBirth;
    playerDetails.position = position;

    console.log(playerDetails);

    sendResponse({ data: playerDetails, success: true });
});
