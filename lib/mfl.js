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
/*
MFL.prototype.players = function() {
    this.request('players');
};

MFL.prototype.league = function(leagueid) {
    leagueid = leagueid || this.leagueid;
    this.request('league', leagueid);
};

MFL.prototype.allRules = function() {
    this.request('allRules');
};

MFL.prototype.injuries = function(week) {
    week = week || this.week;
    this.request('injuries', week);
};

MFL.prototype.nflSchedule = function(week) {
    week = week || this.week;
    this.request('nflSchedule', week);
};

MFL.prototype.adp = function() {
    this.request('adp');
};

MFL.prototype.topAdds = function(week) {
    week = week || this.week;
    this.request('topAdds', week);
};

MFL.prototype.topDrops = function(week) {
    week = week || this.week;
    this.request('topDrops', week);
};

MFL.prototype.topStarters = function(week) {
    week = week || this.week;
    this.request('topStarters', week);
};

MFL.prototype.topOwns = function(week) {
    week = week || this.week;
    this.request('topOwns', week);
};

MFL.prototype.rules = function(leagueid) {
    leagueid = leagueid || this.leagueid;
    this.request('rules', leagueid);
};

MFL.prototype.rosters = function(leagueid) {
    leagueid = leagueid || this.leagueid;
    this.request('rosters', leagueid);
};

MFL.prototype.standings = function(leagueid) {
    leagueid = leagueid || this.leagueid;
    this.request('standings', leagueid);
};

MFL.prototype.weeklyResults = function(leagueid, week) {
    leagueid = leagueid || this.leagueid;
    week = week || this.week;
    this.request('weeklyResults', leagueid, week);
};

MFL.prototype.liveScoring = function(leagueid, week) {
    leagueid = leagueid || this.leagueid;
    week = week || this.week;
    this.request('liveScoring', leagueid, week);
};

MFL.prototype.playerScores = function(week) {
    week = week || this.week;
    this.request('playerScores', leagueid, week);
};

MFL.prototype.draftResults = function(leagueid) {
    leagueid = leagueid || this.leagueid;
    this.request('draftResults', leagueid);
};

MFL.prototype.futureDraftPicks = function(leagueid) {
    leagueid = leagueid || this.leagueid;
    this.request('futureDraftPicks', leagueid);
};

MFL.prototype.auctionResults = function(leagueid) {
    leagueid = leagueid || this.leagueid;
    this.request('auctionResults', leagueid);
};

MFL.prototype.freeAgents = function(leagueid) {
    leagueid = leagueid || this.leagueid;
    this.request('freeAgents', leagueid);
};

MFL.prototype.transactions = function(leagueid, week) {
    leagueid = leagueid || this.leagueid;
    week = week || this.week;
    this.request('transactions', leagueid, week);
};

MFL.prototype.rss = function(leagueid) {
    leagueid = leagueid || this.leagueid;
    this.request('rss', leagueid);
};

MFL.prototype.siteNews = function() {
    this.request('siteNews');
};

MFL.prototype.projectedScores = function(leagueid, week) {
    leagueid = leagueid || this.leagueid;
    week = week || this.week;
    this.request('projectedScores', leagueid, week);
};

MFL.prototype.leagueSearch = function() {
    this.request('leagueSearch');
};

MFL.prototype.messageBoard = function(leagueid) {
    leagueid = leagueid || this.leagueid;
    this.request('messageBoard', leagueid);
};

MFL.prototype.messageBoardThread = function(leagueid) {
    leagueid = leagueid || this.leagueid;
    this.request('messageBoardThread', leagueid);
};

MFL.prototype.playerprofile = function(playerid) {
    this.request('playerprofile', playerid);
};

MFL.prototype.playerStatus = function(leagueid) {
    this.request('playerStatus', leagueid);
};

MFL.prototype.accounting = function(leagueid) {
    this.request('accounting', leagueid);
};

MFL.prototype.calendar = function(leagueid) {
    this.request('calendar', leagueid);
};

MFL.prototype.ics = function(leagueid) {
    this.request('ics', leagueid);
};

MFL.prototype.pointsAllowed = function(leagueid) {
    this.request('pointsAllowed', leagueid);
};

MFL.prototype.pendingTrades = function(leagueid) {
    this.request('pendingTrades', leagueid);
};

MFL.prototype.tradeBait = function(leagueid) {
    this.request('tradeBait', leagueid);
};

MFL.prototype.whoShouldIStart = function(week) {
    this.request('whoShouldIStart', week);
};

MFL.prototype.polls = function(leagueid) {
    this.request('whoShouldIStart', leagueid);
};

MFL.prototype.survivorPool = function(leagueid) {
    this.request('survivorPool', leagueid);
};

MFL.prototype.pool = function(leagueid) {
    this.request('pool', leagueid);
};

MFL.prototype.playoffBracket = function(leagueid) {
    this.request('playoffBracket', leagueid);
};

MFL.prototype.appearance = function(leagueid) {
    this.request('appearance', leagueid);
};

MFL.prototype.assets = function(leagueid) {
    this.request('assets', leagueid);
};

MFL.prototype.salaryAdjustments = function(leagueid) {
    this.request('salaryAdjustments', leagueid);
};*/


module.exports = MFL;