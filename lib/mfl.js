var request = require('request'),
    _ = require('underscore'),

    settings = {
        host: 'football22.myfantasyleague.com/',
        year: '2014',
    },

    requireleague = [
        'league',
        'rules',
        'rosters',
        'standings',
        'weeklyResults',
        'liveScoring',
        'draftResults',
        'futureDraftPicks',
        'auctionResults',
        'freeAgents',
        'transactions',
        'rss',
        'projectedScores',
        'messageBoard',
        'messageBoardThread',
        'playerStatus',
        'accounting',
        'calendar',
        'ics',
        'pointsAllowed',
        'pendingTrades',
        'tradeBait',
        'polls',
        'survivorPool',
        'pool',
        'playoffBracket',
        'appearance',
        'assets',
        'salaryAdjustments'
    ],

    requireweek = [
        'injuries',
        'nflSchedule',
        'topAdds',
        'topDrops',
        'topStarters',
        'topOwns',
        'weeklyResults',
        'liveScoring',
        'playerScores',
        'transactions',
        'projectedScores',
        'whoShouldIStart'
    ],

    requireplayer = [
        'playerProfile',
        'playerStatus'
    ],

    requirelogin = [

    ];

var MFL = function(leagueid, week) {
    this.leagueid = leagueid || null;
    this.week = week || null;
}

MFL.prototype.request = function(requesttype, options, callback) {

    leagueid = options.leagueid || this.leagueid;
    week = options.week || this.week;
    playerid = options.playerid;

    params = '';

    if (_.indexOf(requireleague, requesttype) > -1) {
        if (typeof leagueid === 'undefined' || leagueid === null) {
            console.log('League ID required');
            var error = {
                status: 500,
                name: 'Null Exception',
                message: 'League ID is required for ' + requesttype
            };
        }
        params += '&L=' + leagueid;
    }

    if (_.indexOf(requireweek, requesttype) > -1) {
        if (typeof week === 'undefined' || week === null) {
            console.log('week is required');
            var error = {
                status: 500,
                name: 'Null Exception',
                message: 'Week is required for ' + requesttype
            };
        }
        params += '&W=' + week;
    }

    if (_.indexOf(requireplayer, requesttype) > -1) {
        if (typeof playerid === 'undefined' || playerid === null) {
            console.log('playerid is required');
            var error = {
                status: 500,
                name: 'Null Exception',
                message: 'Player ID is required for ' + requesttype
            };
        }
        params += '&P=' + playerid;
    }

    if (error) {
        if (typeof callback === "function") {
            callback(error);
        }
        return;
    }
    request('http://' + settings.host + settings.year + '/export?TYPE=' + requesttype + params + '&JSON=1', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            if (typeof callback === "function") {
                try {
                    JSON.parse(body);
                } catch (e) {
                    var error = {
                        status: 500,
                        name: 'GeneralError',
                        message: 'An error has occurred. Check your request.'
                    };
                }
            }
        } else {
            var error = {
                status: response.statusCode,
                name: 'GeneralError',
                message: 'An error has occurred. Check your request.'
            };
        }
        callback(error, body);
    });
};

module.exports = MFL;