                {!! csrf_field() !!}
                <div class="row">
                <!-- Team Name -->
                    <div class="col-sm-6">
                        <div class="form-group @if ($errors->has('name')) has-error @endif">
                            <label for="team-name" class="control-label">Team</label>
                            <input type="text" name="name" placeholder="Duke" id="team-name" class="form-control" value="{{ (!empty(old('name'))||!isset($team))?old('name'):$team->name }}">
                        </div>
                    </div>

                    <!-- Team Mascot -->
                    <div class="col-sm-6">
                        <div class="form-group @if ($errors->has('mascot')) has-error @endif">
                            <label for="team-mascot" class="control-label">Mascot</label>
                            <input type="text" name="mascot" placeholder="Blue Devils" id="team-mascot" class="form-control" value="{{ (!empty(old('mascot'))||!isset($team))?old('mascot'):$team->mascot }}">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <!-- Team rank -->
                    <div class="col-sm-3">
                        <div class="form-group @if ($errors->has('rank')) has-error @endif">
                            <label for="rank" class="control-label">Rank</label>
                            <input type="text" name="rank" placeholder="1" id="rank" class="form-control" value="{{ (!empty(old('rank'))||!isset($team))?old('rank'):$team->rank }}">
                        </div>
                    </div>
                    <!-- Team region -->
                    <div class="col-sm-3">
                        <div class="form-group @if ($errors->has('region')) has-error @endif">
                            <label for="region" class="control-label">Region</label>
                            <input type="text" name="region" placeholder="West" id="region" class="form-control" value="{{ (!empty(old('region'))||!isset($team))?old('region'):$team->region->region }}">
                        </div>
                    </div>
                    <!-- Colors -->
                    <div class="col-sm-3">
                        <div class="form-group @if ($errors->has('primary_color')) has-error @endif">
                            <label for="primary" class="control-label">Primary Color</label>
                            <input type="text" name="primary_color" placeholder="0000FF" id="primary" class="form-control" value="{{ (!empty(old('primary_color'))||!isset($team))?old('primary_color'):$team->primary_color }}">
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="form-group @if ($errors->has('accent_color')) has-error @endif">
                            <label for="secondary" class="control-label">Accent Color</label>
                            <input type="text" name="accent_color" placeholder="FFFFFF" id="secondary" class="form-control" value="{{ (!empty(old('accent_color'))||!isset($team))?old('accent_color'):$team->accent_color }}">
                        </div>
                    </div>
                </div>


