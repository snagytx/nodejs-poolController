//  nodejs-poolController.  An application to control pool equipment.
//  Copyright (C) 2016, 2017, 2018, 2019.  Russell Goldin, tagyoureit.  russ.goldin@gmail.com
//
//  This program is free software: you can redistribute it and/or modify
//  it under the terms of the GNU Affero General Public License as
//  published by the Free Software Foundation, either version 3 of the
//  License, or (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU Affero General Public License for more details.
//
//  You should have received a copy of the GNU Affero General Public License
//  along with this program.  If not, see <http://www.gnu.org/licenses/>.

//Broadcast current heat set point and mode
import { settings, logger, heat, temperature } from'../../../../etc/internal';
export function process ( data: number[], counter: number )
{
    //   0 1  2  3 4  5  6 7   8  9  19 11 12 13  14 15 16 17 18 19  20
    //[165,x,15,16,8,13,75,75,64,87,101,11,0,  0 ,62 ,0 ,0 ,0 ,0 ,2,190]
    //function heatObj(poolSetPoint, poolHeatMode, spaSetPoint, spaHeatMode)

    let logConfigMessages = settings.get( 'logConfigMessages' )

    heat.setHeatModeAndSetPoints( data[ 9 ], data[ 11 ] & 3, data[ 10 ], ( data[ 11 ] & 12 ) >> 2, counter )
    temperature.setTempFromController( data[ 6 ], data[ 7 ], data[ 8 ], data[ 14 ], 0 ) //TODO: which one is freeze?


    if ( logConfigMessages )
    {
        logger.silly( 'Msg# %s  Heat status packet data: %s  currentHeat: %s', counter, data );
    }


    var decoded = true;

    return decoded
}