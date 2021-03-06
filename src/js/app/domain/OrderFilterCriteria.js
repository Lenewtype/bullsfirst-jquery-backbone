/**
 * Copyright 2013 Archfirst
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * app/domain/OrderFilterCriteria
 *
 * Attributes:
 *   accountId: int
 *   fromDate: string (format MM/DD/YYYY)
 *   toDate: string (format MM/DD/YYYY)
 *   orderId: int
 *   symbol: string
 *   sides: string[] (Buy, Sell)
 *   statuses: string[] (New, PartiallyFilled, Filled, Canceled, DoneForDay)
 *
 * @author Naresh Bhatia
 */
define(
    [
        'backbone',
        'validation'
    ],
    function(Backbone) {
        'use strict';

        return Backbone.Model.extend({

            validation: {
                fromDate: [
                    {
                        required: false
                    },
                    {
                        pattern: 'isoDate',
                        msg: 'Please enter a date as MM/DD/YYYY'
                    },
                    {
                        fn: 'validateDateRange'
                    }
                ],
                toDate: [
                    {
                        required: false
                    },
                    {
                        pattern: 'isoDate',
                        msg: 'Please enter a date as MM/DD/YYYY'
                    }
                ],
                orderId: [
                    {
                        required: false
                    },
                    {
                        pattern: 'number'
                    }
                ]
            },

            validateDateRange: function(value, attr, computedState) {

                // Don't check if either date is blank
                var fromDate = computedState.fromDate;
                var toDate   = computedState.toDate;
                if (fromDate === '' || toDate === '') {
                    return;
                }

                var fromTime = new Date(fromDate).getTime();
                var toTime = new Date(toDate).getTime();
                if (fromTime > toTime) {
                    return 'From date cannot be greater than the to date';
                }
            }
        });
    }
);