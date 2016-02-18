<div class="bracket-game">
    <button class="btn btn-team btn-primary">
        {{ $teamRepo->byTeamId($game->team_a)->name }}
    </button>
    <button class="btn btn-team btn-primary">
        {{ $teamRepo->byTeamId($game->team_b)->name }}
    </button>
</div>
