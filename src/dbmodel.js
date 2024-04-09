module.exports = {
    getCurrentCup: function() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM cups WHERE status <> 2", function(err, result) {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(result);
            });
        })
    },

    getCupPlayers: function(cupId) {
        return new Promise((resolve, reject) => {
            db.query("SELECT p.id, p.name FROM cup_players cp JOIN players p ON p.id=cp.player_id where cp.cup_id=" + cupId, function(err, result) {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(result);
            })
        })
    }
}
