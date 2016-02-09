                {!! csrf_field() !!}
                <div class="row">
                <!-- Team Name -->
                    <div class="col-sm-6">
                        <div class="form-group @if ($errors->has('name')) has-error @endif">
                            <label for="team-name" class="col-sm-3 control-label">Team</label>
                            <input type="text" name="name" placeholder="Duke" id="team-name" class="form-control" value="{{ old('name') }}">
                        </div>
                    </div>

                    <!-- Team Mascot -->
                    <div class="col-sm-6">
                        <div class="form-group @if ($errors->has('mascot')) has-error @endif">
                            <label for="team-mascot" class="col-sm-3 control-label">Mascot</label>
                            <input type="text" name="mascot" placeholder="Blue Devils" id="team-name" class="form-control" value="{{ old('mascot') }}">
                        </div>
                    </div>
                </div>

                <!-- Colors -->
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group @if ($errors->has('primary_color')) has-error @endif">
                            <label for="primary" class="col-sm-3 control-label">Primary Color</label>
                            <input type="text" name="primary_color" placeholder="0000FF" id="primary" class="form-control" value="{{ old('primary_color') }}">
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group @if ($errors->has('accent_color')) has-error @endif">
                            <label for="secondary" class="col-sm-3 control-label">Accent Color</label>
                            <input type="text" name="accent_color" placeholder="0000FF" id="secondary" class="form-control" value="{{ old('accent_color') }}">
                        </div>
                    </div>
                </div>
@push('scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/typeahead.js/0.11.1/typeahead.jquery.min.js"></script>
@endpush


