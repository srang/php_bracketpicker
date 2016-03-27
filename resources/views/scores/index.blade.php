@extends('layouts.app')

@section('content')
    <div class="container">
        <!-- User Brackets -->
@if ($brackets->count() > 0)
        <div class="panel panel-default">
            <div class="panel-heading">
                Brackets
            </div>

            <div class="panel-body">
                    <table class="table table-striped">

                        <!-- Table Headings -->
                        <thead>
                            <th>Owner</th>
                            <th>Bracket Name</th>
                            <th>Winner</th>
                            <th>Score</th>
                            <th>&nbsp;</th>
                        </thead>

                        <!-- Table Body -->
                        <tbody>
@foreach ($brackets as $bracket)
                            <tr>
                                <!-- Bracket Info -->
                                <td class="table-text">
                                    <div>{{ $bracket->user->name }}</div>
                                </td>
@include('brackets.list_item')
                            </tr>
@endforeach
                        </tbody>
                    </table>
                </div>
        </div>
@endif
    </div>
@endsection
@push('styles')
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/t/bs/jq-2.2.0,dt-1.10.11/datatables.min.css"/>
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/plug-ins/1.10.11/integration/font-awesome/dataTables.fontAwesome.css" />
@endpush
@push('scripts')
    <script type="text/javascript" src="https://cdn.datatables.net/t/bs-3.3.6/jq-2.2.0,dt-1.10.11/datatables.min.js"></script>
    <script>
        $('.table').DataTable();
    </script>
@endpush
