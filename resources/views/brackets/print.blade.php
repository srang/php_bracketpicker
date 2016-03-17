<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- I am not proud of this but it was done in one night during a go-live --}}
        <title>{{ $tourney_name }}</title>

        <link href="{{ elixir('css/printbracket.css') }}" rel="stylesheet">
    </head>
    <body id="app-layout">
        <table>
            <thead>
                <th>{{ $regions->get(0)->region }}</th>
                <th>Second Round</th>
                <th>Sweet 16</th>
                <th>Elite 8</th>
                <th>Final 4</th>
                <th>Championship</th>
                <th>Final 4</th>
                <th>Elite 8</th>
                <th>Sweet 16</th>
                <th>Second Round</th>
                <th>{{ $regions->get(2)->region }}</th>
            </thead>
            <tfoot>
                <tr>
                    <th>{{ $regions->get(1)->region }}</th>
                    <td>Second Round</td>
                    <td>Sweet 16</td>
                    <td>Elite 8</td>
                    <td>Final 4</td>
                    <td>Championship</td>
                    <td>Final 4</td>
                    <td>Elite 8</td>
                    <td>Sweet 16</td>
                    <td>Second Round</td>
                    <th>{{ $regions->get(3)->region }}</th>
                </tr>
            </tfoot>
            <tbody>
                <tr>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(0)->team_a])
                    </td>
                    <td rowspan="2" >
@include('brackets.print_cell', ['team_id' => $games->get('2')->get(0)->team_a])
                    </td>
                    <td rowspan="4" >
@include('brackets.print_cell', ['team_id' => $games->get('3')->get(0)->team_a])
                    </td>
                    <td rowspan="8" >
@include('brackets.print_cell', ['team_id' => $games->get('4')->get(0)->team_a])
                    </td>
                    <td rowspan="16">
@include('brackets.print_cell', ['team_id' => $games->get('5')->get(0)->team_a])
                    </td>
                    <td rowspan="12">
@include('brackets.print_cell', ['team_id' => $games->get('6')->get(0)->team_a])
                    </td>
                    <td rowspan="16">
@include('brackets.print_cell', ['team_id' => $games->get('5')->get(1)->team_a])
                    </td>
                    <td rowspan="8">
@include('brackets.print_cell', ['team_id' => $games->get('4')->get(2)->team_a])
                    </td>
                    <td rowspan="4">
@include('brackets.print_cell', ['team_id' => $games->get('3')->get(4)->team_a])
                    </td>
                    <td rowspan="2">
@include('brackets.print_cell', ['team_id' => $games->get('2')->get(8)->team_a])
                    </td>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(16)->team_a])
                    </td>
                </tr>

                <tr>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(0)->team_b])
                    </td>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(16)->team_b])
                    </td>
                </tr>

                <tr>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(1)->team_a])
                    </td>
                    <td rowspan="2">
@include('brackets.print_cell', ['team_id' => $games->get('2')->get(0)->team_b])
                    </td>
                    <td rowspan="2">
@include('brackets.print_cell', ['team_id' => $games->get('2')->get(8)->team_b])
                    </td>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(17)->team_a])
                    </td>
                </tr>

                <tr>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(1)->team_b])
                    </td>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(17)->team_b])
                    </td>
                </tr>

                <tr>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(2)->team_a])
                    </td>
                    <td rowspan="2">
@include('brackets.print_cell', ['team_id' => $games->get('2')->get(1)->team_a])
                    </td>
                    <td rowspan="4">
@include('brackets.print_cell', ['team_id' => $games->get('3')->get(0)->team_b])
                    </td>
                    <td rowspan="4">
@include('brackets.print_cell', ['team_id' => $games->get('3')->get(4)->team_b])
                    </td>
                    <td rowspan="2">
@include('brackets.print_cell', ['team_id' => $games->get('2')->get(9)->team_a])
                    </td>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(18)->team_a])
                    </td>
                </tr>

                <tr>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(2)->team_b])
                    </td>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(18)->team_b])
                    </td>
                </tr>

                <tr>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(3)->team_a])
                    </td>
                    <td rowspan="2">
@include('brackets.print_cell', ['team_id' => $games->get('2')->get(1)->team_b])
                    </td>
                    <td rowspan="2">
@include('brackets.print_cell', ['team_id' => $games->get('2')->get(9)->team_b])
                    </td>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(19)->team_a])
                    </td>
                </tr>

                <tr>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(3)->team_b])
                    </td>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(19)->team_b])
                    </td>
                </tr>

                <tr>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(4)->team_a])
                    </td>
                    <td rowspan="2">
@include('brackets.print_cell', ['team_id' => $games->get('2')->get(2)->team_a])
                    </td>
                    <td rowspan="4">
@include('brackets.print_cell', ['team_id' => $games->get('3')->get(1)->team_a])
                    </td>
                    <td rowspan="8">
@include('brackets.print_cell', ['team_id' => $games->get('4')->get(0)->team_b])
                    </td>
                    <td rowspan="8">
@include('brackets.print_cell', ['team_id' => $games->get('4')->get(2)->team_b])
                    </td>
                    <td rowspan="4">
@include('brackets.print_cell', ['team_id' => $games->get('3')->get(5)->team_a])
                    </td>
                    <td rowspan="2">
@include('brackets.print_cell', ['team_id' => $games->get('2')->get(10)->team_a])
                    </td>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(20)->team_a])
                    </td>
                </tr>

                <tr>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(4)->team_b])
                    </td>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(20)->team_b])
                    </td>
                </tr>

                <tr>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(5)->team_a])
                    </td>
                    <td rowspan="2">
@include('brackets.print_cell', ['team_id' => $games->get('2')->get(2)->team_b])
                    </td>
                    <td rowspan="2">
@include('brackets.print_cell', ['team_id' => $games->get('2')->get(10)->team_b])
                    </td>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(21)->team_a])
                    </td>
                </tr>

                <tr>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(5)->team_b])
                    </td>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(21)->team_b])
                    </td>
                </tr>

                <tr>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(6)->team_a])
                    </td>
                    <td rowspan="2">
@include('brackets.print_cell', ['team_id' => $games->get('2')->get(3)->team_a])
                    </td>
                    <td rowspan="4">
@include('brackets.print_cell', ['team_id' => $games->get('3')->get(1)->team_b])
                    </td>
                    <td rowspan="8">
<span class='team'>National Champion</span><br>
@include('brackets.print_cell', ['team_id' => $games->get('6')->get(0)->winner])
                    </td>
                    <td rowspan="4">
@include('brackets.print_cell', ['team_id' => $games->get('3')->get(5)->team_b])
                    </td>
                    <td rowspan="2">
@include('brackets.print_cell', ['team_id' => $games->get('2')->get(11)->team_a])
                    </td>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(22)->team_a])
                    </td>
                </tr>

                <tr>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(6)->team_b])
                    </td>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(22)->team_b])
                    </td>
                </tr>

                <tr>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(7)->team_a])
                    </td>
                    <td rowspan="2">
@include('brackets.print_cell', ['team_id' => $games->get('2')->get(3)->team_b])
                    </td>
                    <td rowspan="2">
@include('brackets.print_cell', ['team_id' => $games->get('2')->get(11)->team_b])
                    </td>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(23)->team_a])
                    </td>
                </tr>

                <tr>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(7)->team_b])
                    </td>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(23)->team_b])
                    </td>
                </tr>


                <tr>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(8)->team_a])
                    </td>
                    <td rowspan="2">
@include('brackets.print_cell', ['team_id' => $games->get('2')->get(4)->team_a])
                    </td>
                    <td rowspan="4">
@include('brackets.print_cell', ['team_id' => $games->get('3')->get(2)->team_a])
                    </td>
                    <td rowspan="8">
@include('brackets.print_cell', ['team_id' => $games->get('4')->get(1)->team_a])
                    </td>
                    <td rowspan="16">
@include('brackets.print_cell', ['team_id' => $games->get('5')->get(0)->team_b])
                    </td>
                    <td rowspan="16">
@include('brackets.print_cell', ['team_id' => $games->get('5')->get(1)->team_b])
                    </td>
                    <td rowspan="8">
@include('brackets.print_cell', ['team_id' => $games->get('4')->get(3)->team_a])
                    </td>
                    <td rowspan="4">
@include('brackets.print_cell', ['team_id' => $games->get('3')->get(6)->team_a])
                    </td>
                    <td rowspan="2">
@include('brackets.print_cell', ['team_id' => $games->get('2')->get(12)->team_a])
                    </td>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(24)->team_a])
                    </td>
                </tr>

                <tr>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(8)->team_b])
                    </td>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(24)->team_b])
                    </td>
                </tr>

                <tr>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(9)->team_a])
                    </td>
                    <td rowspan="2">
@include('brackets.print_cell', ['team_id' => $games->get('2')->get(4)->team_b])
                    </td>
                    <td rowspan="2">
@include('brackets.print_cell', ['team_id' => $games->get('2')->get(12)->team_b])
                    </td>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(25)->team_a])
                    </td>
                </tr>

                <tr>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(9)->team_b])
                    </td>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(25)->team_b])
                    </td>
                </tr>

                <tr>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(10)->team_a])
                    </td>
                    <td rowspan="2">
@include('brackets.print_cell', ['team_id' => $games->get('2')->get(5)->team_a])
                    </td>
                    <td rowspan="4">
@include('brackets.print_cell', ['team_id' => $games->get('3')->get(2)->team_b])
                    </td>
                    <td rowspan="12">
@include('brackets.print_cell', ['team_id' => $games->get('6')->get(0)->team_b])
                    </td>
                    <td rowspan="4">
@include('brackets.print_cell', ['team_id' => $games->get('3')->get(6)->team_b])
                    </td>
                    <td rowspan="2">
@include('brackets.print_cell', ['team_id' => $games->get('2')->get(13)->team_a])
                    </td>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(26)->team_a])
                    </td>
                </tr>

                <tr>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(10)->team_b])
                    </td>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(26)->team_b])
                    </td>
                </tr>

                <tr>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(11)->team_a])
                    </td>
                    <td rowspan="2">
@include('brackets.print_cell', ['team_id' => $games->get('2')->get(5)->team_b])
                    </td>
                    <td rowspan="2">
@include('brackets.print_cell', ['team_id' => $games->get('2')->get(13)->team_b])
                    </td>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(27)->team_a])
                    </td>
                </tr>

                <tr>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(11)->team_b])
                    </td>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(27)->team_b])
                    </td>
                </tr>

                <tr>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(12)->team_a])
                    </td>
                    <td rowspan="2">
@include('brackets.print_cell', ['team_id' => $games->get('2')->get(6)->team_a])
                    </td>
                    <td rowspan="4">
@include('brackets.print_cell', ['team_id' => $games->get('3')->get(3)->team_a])
                    </td>
                    <td rowspan="8">
@include('brackets.print_cell', ['team_id' => $games->get('4')->get(1)->team_b])
                    </td>
                    <td rowspan="8">
@include('brackets.print_cell', ['team_id' => $games->get('4')->get(3)->team_b])
                    </td>
                    <td rowspan="4">
@include('brackets.print_cell', ['team_id' => $games->get('3')->get(7)->team_a])
                    </td>
                    <td rowspan="2">
@include('brackets.print_cell', ['team_id' => $games->get('2')->get(14)->team_a])
                    </td>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(28)->team_a])
                    </td>
                </tr>

                <tr>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(12)->team_b])
                    </td>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(28)->team_b])
                    </td>
                </tr>

                <tr>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(13)->team_a])
                    </td>
                    <td rowspan="2">
@include('brackets.print_cell', ['team_id' => $games->get('2')->get(6)->team_b])
                    </td>
                    <td rowspan="2">
@include('brackets.print_cell', ['team_id' => $games->get('2')->get(14)->team_b])
                    </td>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(29)->team_a])
                    </td>
                </tr>

                <tr>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(13)->team_b])
                    </td>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(29)->team_b])
                    </td>
                </tr>

                <tr>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(14)->team_a])
                    </td>
                    <td rowspan="2">
@include('brackets.print_cell', ['team_id' => $games->get('2')->get(7)->team_a])
                    </td>
                    <td rowspan="4">
@include('brackets.print_cell', ['team_id' => $games->get('3')->get(3)->team_b])
                    </td>
                    <td rowspan="4">
@include('brackets.print_cell', ['team_id' => $games->get('3')->get(7)->team_b])
                    </td>
                    <td rowspan="2">
@include('brackets.print_cell', ['team_id' => $games->get('2')->get(15)->team_a])
                    </td>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(30)->team_a])
                    </td>
                </tr>

                <tr>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(14)->team_b])
                    </td>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(30)->team_b])
                    </td>
                </tr>

                <tr>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(15)->team_a])
                    </td>
                    <td rowspan="2">
@include('brackets.print_cell', ['team_id' => $games->get('2')->get(7)->team_b])
                    </td>
                    <td rowspan="2">
@include('brackets.print_cell', ['team_id' => $games->get('2')->get(15)->team_b])
                    </td>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(31)->team_a])
                    </td>
                </tr>

                <tr>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(15)->team_b])
                    </td>
                    <td>
@include('brackets.print_cell', ['team_id' => $games->get('1')->get(31)->team_b])
                    </td>
                </tr>

            </tbody>
        </table>
    </body>
</html>