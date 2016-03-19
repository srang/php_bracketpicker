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
