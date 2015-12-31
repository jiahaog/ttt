'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PlayerDumb = exports.PlayerHuman = undefined;

var _readlineSync = require('readline-sync');

var _readlineSync2 = _interopRequireDefault(_readlineSync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// interface for player

var Player = (function () {
    /**
     * @param {string} [playerName]
     */

    function Player(playerName) {
        _classCallCheck(this, Player);

        this.playerName = playerName;
    }
    /**
     *
     * @param {[[]]} gameGrid A copied 2D array of the game grid
     */

    _createClass(Player, [{
        key: 'getMove',
        value: function getMove(gameGrid) {}
    }]);

    return Player;
})();

var PlayerHuman = (function (_Player) {
    _inherits(PlayerHuman, _Player);

    function PlayerHuman() {
        _classCallCheck(this, PlayerHuman);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(PlayerHuman).apply(this, arguments));
    }

    _createClass(PlayerHuman, [{
        key: 'getMove',
        value: function getMove(gameGrid) {
            console.log(gameGrid);
            var userInput = _readlineSync2.default.question('Player ' + this.playerName + ' Enter your move x, y separated by a space:');
            return userInput.split(/ +/);
        }
    }]);

    return PlayerHuman;
})(Player);

var PlayerDumb = (function (_Player2) {
    _inherits(PlayerDumb, _Player2);

    function PlayerDumb(playerName, moveList) {
        _classCallCheck(this, PlayerDumb);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(PlayerDumb).call(this, playerName));

        _this2.moveList = moveList;
        _this2.moveCounter = -1;
        return _this2;
    }

    _createClass(PlayerDumb, [{
        key: 'getMove',
        value: function getMove(gameGrid) {
            this.moveCounter += 1;
            var moveToMake = this.moveList[this.moveCounter];

            if (!moveToMake) {
                console.log('Player: ' + this.playerName + ' No more moves!');
            }

            return moveToMake;
        }
    }]);

    return PlayerDumb;
})(Player);

exports.PlayerHuman = PlayerHuman;
exports.PlayerDumb = PlayerDumb;