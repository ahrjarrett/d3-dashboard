import React from 'react'

export const ModelTable = () => {
  return (
    <table>
      <tbody style={{ fontSize: 11 }}>
        <tr>
          <th>Field</th>
          <th>Description</th>
          <th>Type</th>
          <th>Notes</th>
        </tr>

        <tr>
          <td>
            <p>weekof</p>
          </td>
          <td>
            <p>Week that the TV commercial took place</p>
          </td>
          <td>
            <p>dimension</p>
          </td>
          <td>
            <p></p>
          </td>
          <td>
            <p></p>
          </td>
        </tr>

        <tr>
          <td>
            <p>broadcast_weekof</p>
          </td>
          <td>
            <p>
              Broadcast week that the TV commercial took place - broadcast weeks
              begin Monday 5am
            </p>
          </td>
          <td>
            <p>dimension</p>
          </td>
          <td>
            <p></p>
          </td>
        </tr>

        <tr>
          <td>
            <p>date_aired</p>
          </td>
          <td>
            <p>Date the commercial aired</p>
          </td>
          <td>
            <p>dimension</p>
          </td>
          <td>
            <p></p>
          </td>
        </tr>

        <tr>
          <td>
            <p>time_aired</p>
          </td>
          <td>
            <p>time of airing</p>
          </td>
          <td>
            <p>dimension</p>
          </td>
          <td>
            <p></p>
          </td>
        </tr>

        <tr>
          <td>
            <p>date_time_aired</p>
          </td>
          <td>
            <p></p>
          </td>
          <td>
            <p>dimension</p>
          </td>
          <td>
            <p></p>
          </td>
        </tr>

        <tr>
          <td>
            <p>station_code</p>
          </td>
          <td>
            <p>station code that commercial aired on</p>
          </td>
          <td>
            <p>dimension</p>
          </td>
          <td>
            <p></p>
          </td>
        </tr>

        <tr>
          <td>
            <p>station_name</p>
          </td>
          <td>
            <p>station name</p>
          </td>
          <td>
            <p>dimension</p>
          </td>
          <td>
            <p> </p>
          </td>
        </tr>

        <tr>
          <td>
            <p>bc_day</p>
          </td>
          <td>
            <p>day of week</p>
          </td>
          <td>
            <p>dimension</p>
          </td>
          <td>
            <p> </p>
          </td>
        </tr>

        <tr>
          <td>
            <p>length</p>
          </td>
          <td>
            <p>length of creative</p>
          </td>
          <td>
            <p>dimension</p>
          </td>
          <td>
            <p> </p>
          </td>
        </tr>

        <tr>
          <td>
            <p>program_aired</p>
          </td>
          <td>
            <p>program the commercial aired in</p>
          </td>
          <td>
            <p>dimension</p>
          </td>
          <td>
            <p> </p>
          </td>
        </tr>

        <tr>
          <td>
            <p>dp_aired</p>
          </td>
          <td>
            <p>day part abrev. </p>
          </td>
          <td>
            <p>dimension</p>
          </td>
          <td>
            <p> </p>
          </td>
        </tr>

        <tr>
          <td>
            <p>day_part_aired</p>
          </td>
          <td>
            <p>day part of commercial</p>
          </td>
          <td>
            <p>dimension</p>
          </td>
          <td>
            <p> </p>
          </td>
        </tr>

        <tr>
          <td>
            <p>spent</p>
          </td>
          <td>
            <p>the amount of money spent</p>
          </td>
          <td>
            <p>metric</p>
          </td>
          <td>
            <p> </p>
          </td>
        </tr>

        <tr>
          <td>
            <p>imp</p>
          </td>
          <td>
            <p>number of people who saw commercial</p>
          </td>
          <td>
            <p>metric</p>
          </td>
          <td>
            <p> </p>
          </td>
        </tr>

        <tr>
          <td>
            <p>tier</p>
          </td>
          <td>
            <p>station group (SYND = Syndication, HISP = Hispanic)</p>
          </td>
          <td>
            <p>metric</p>
          </td>
          <td>
            <p> </p>
          </td>
        </tr>

        <tr>
          <td>
            <p>web_visits</p>
          </td>
          <td>
            <p>number of web visits that resulted from commercial</p>
          </td>
          <td>
            <p>metric</p>
          </td>
          <td>
            <p>usually represented as calculation </p>
            <p>
              e.g:
              <br /> - <i>cost per web_visit</i> = spent /web_visit <br />
              <i>response per web visit = </i>&nbsp;web_visit/imp
            </p>
          </td>
        </tr>

        <tr>
          <td>
            <p>sales</p>
          </td>
          <td>
            <p>number of sales </p>
          </td>
          <td>
            <p>metric</p>
          </td>
          <td>
            <p>usually represented as calculation (e.g. spent /sale)</p>
          </td>
        </tr>

        <tr>
          <td>
            <p>leads</p>
          </td>
          <td>
            <p>number of leads</p>
          </td>
          <td>
            <p>metric</p>
          </td>
          <td>
            <p>usually represented as calculation (e.g. spent /lead)</p>
          </td>
        </tr>

        <tr>
          <td>
            <p>last_update_date</p>
          </td>
          <td>
            <p>last time data was updated</p>
          </td>
          <td>
            <p> </p>
          </td>
          <td>
            <p> </p>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
