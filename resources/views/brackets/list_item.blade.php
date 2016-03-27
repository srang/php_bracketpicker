            <td class="table-text">
                <div>{{ $bracket->name }}</div>
            </td>
            <td class="table-text" >
                <span class="text-center team-name" style="background-color: #{{ $bracket->root->victor->primary_color }}; color: #{{ $bracket->root->victor->accent_color }};">
                    {{ $bracket->root->victor->name }}
                </span>
            </td>
            <td class="table-text">
                <div>{{ $bracket->score($ruleset_id) }}</div>
            </td>
            <td>
                <div class="btn-group" role="group">
@if ($tourney_state->name == 'submission')
                    <form action="{{ url('brackets/'.$bracket->bracket_id) }}" method="POST">
                        {!! csrf_field() !!}
                        {!! method_field('DELETE') !!}
                        <button type="submit" class="btn btn-danger">
                            <i class="fa fa-btn fa-trash"></i> Delete
                        </button>
                        <a class="btn btn-info" href="{{ url('brackets/'.$bracket->bracket_id) }}">
                            <i class="fa fa-btn fa-pencil"></i> Edit
                        </a>
                        <a class="btn btn-primary" href="{{ url('brackets/'.$bracket->bracket_id.'/print') }}" target="_blank">
                            <i class="fa fa-btn fa-print"></i> Print
                        </a>
                    </form>
@else 
                    <a class="btn btn-info" href="{{ url('brackets/'.$bracket->bracket_id) }}">
                        <i class="fa fa-btn fa-pencil"></i> View
                    </a>
                    <a class="btn btn-primary" href="{{ url('brackets/'.$bracket->bracket_id.'/print') }}" target="_blank">
                        <i class="fa fa-btn fa-print"></i> Print
                    </a>
@endif
                </div>
            </td>
