chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    const data = request.data || {};
    const defaultValue = 50;

    const attacking = [ "crossing", "finishing", "headingAcc", "shortPassing", "volleys" ];
    const skill = [ "dribbling", "curve", "fkAccuracy", "longPassing", "ballControl" ];
    const movement = [ "acceleration", "sprintSpeed", "agility", "reactions", "balance" ];
    const power = [ "shotPower", "jumping", "stamina", "strength", "longShots" ];
    const mentality = [ "aggression", "interceptions", "positioning", "vision", "penalties", "composure" ];
    const defending = [ "marking", "standingTackle", "slidingTackle" ];
    const goalkeeping = [ "gkDiving", "gkHandling", "gkKicking", "gkPositioning", "gkReflexes" ];
    const playerDetails = {};

    const article = document.querySelectorAll( "article.column" )[ 0 ];
    const firstColumn = article.querySelectorAll( "div.columns" )[ 0 ];
    const secondColumn = article.querySelectorAll( "div.columns" )[ 1 ];
    const attackingStats = firstColumn.querySelectorAll( ".column" )[ 0 ].querySelector( "ul" );
    const skillStats = firstColumn.querySelectorAll( ".column" )[ 1 ].querySelector( "ul" );
    const movementStats = firstColumn.querySelectorAll( ".column" )[ 2 ].querySelector( "ul" );
    const powerStats = firstColumn.querySelectorAll( ".column" )[ 3 ].querySelector( "ul" );
    const mentalityStats = secondColumn.querySelectorAll( ".column" )[ 0 ].querySelector( "ul" );
    const defendingStats = secondColumn.querySelectorAll( ".column" )[ 1 ].querySelector( "ul" );
    const goalkeepingStats = secondColumn.querySelectorAll( ".column" )[ 2 ].querySelector( "ul" );
    
    function saveStats( accumulator, category, categoryStats ) {
        category.forEach( ( item, index ) => {
            accumulator[ item ] = parseInt( categoryStats.querySelectorAll( "span" )[ index ].innerHTML, 10 ) || defaultValue;
        } );
    }

    saveStats( playerDetails, attacking, attackingStats );
    saveStats( playerDetails, skill, skillStats );
    saveStats( playerDetails, movement, movementStats );
    saveStats( playerDetails, power, powerStats );
    saveStats( playerDetails, mentality, mentalityStats );
    saveStats( playerDetails, defending, defendingStats );
    saveStats( playerDetails, goalkeeping, goalkeepingStats );

    sendResponse({data: playerDetails, success: true});
});
