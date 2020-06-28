// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;

import java.util.Collection;
import java.util.Arrays;
import java.util.ArrayList;

public final class FindMeetingQuery {
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {

    Collection<String> people = request.getAttendees();
    Collection<TimeRange> times = new ArrayList<TimeRange>(); // return values
    long length = request.getDuration(); // meeting length
    int size = 1440; // minutes in a day
    boolean[] openTimes = new boolean[size]; // initialize array to compare times (all set to TRUE to begin)
    Arrays.fill(openTimes, Boolean.TRUE);

    if (length > size) {
        return times;
    }

    // determine free times within the day
    for (Event event : events) {
        TimeRange range = event.getWhen();

        for(String person : people) { // if includes atendee of event
            if (people.contains(person)) {
                for (int j = range.start(); j < range.end(); j++) { // sets all already sceduled times to false
                    openTimes[j] = false;
                }
            }
        }
    }
    //throw new UnsupportedOperationException("TODO: Implement this method.");
  }
}
