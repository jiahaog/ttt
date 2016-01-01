import TicTacToe from './board/tictactoe';
import PerfectPlayer from './players/perfectPlayer';
import Player from './players/player';

const api = {
    players: {
        PerfectPlayer: PerfectPlayer,
        Player: Player
    },
    TicTacToe: TicTacToe
};

export default api;
