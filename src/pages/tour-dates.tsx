import React, { useState, useMemo, useCallback } from 'react';
import { Box, Image, Button } from 'grommet';
import { graphql, useStaticQuery } from 'gatsby';
import ModalEvent from '../components/ModalEvent';
import Month from '../components/Calendar/Month';
import groupEventsByMonth from '../utils/groupEventsByMonth';
import { format } from 'date-fns';
import headerImage from '../images/pp-events-header.png'
import { LinkPrevious } from 'grommet-icons';

import CalendarLayout from '../components/calendarLayout'

const getQuery = () => {
  if (typeof window !== 'undefined') {
    return new URLSearchParams(window.location.search);
  }
  return new URLSearchParams();
};

const getQueryStringVal = (key: string): string | null => {
  return getQuery().get(key);
};
const all = getQueryStringVal("all");
let unavailableDates = [];
if (all) {
    unavailableDates = [
        new Date(2021, 4, 27),
        new Date(2021, 4, 28),
        new Date(2021, 4, 29),
        new Date(2021, 4, 30),
        new Date(2021, 5, 1),
        new Date(2021, 5, 9),
        new Date(2021, 5, 21),
        new Date(2021, 5, 22),
        new Date(2021, 5, 23),
        new Date(2021, 5, 28),
        new Date(2021, 5, 29),
        new Date(2021, 5, 30),
        new Date(2021, 6, 25),
        new Date(2021, 6, 26),
        new Date(2021, 7, 14),
        new Date(2021, 7, 15),
        new Date(2021, 7, 16),
        new Date(2021, 7, 17),
        new Date(2021, 7, 18),
        new Date(2021, 7, 19),
        new Date(2021, 7, 20),
        new Date(2021, 7, 21),
        new Date(2021, 7, 29),
        new Date(2021, 7, 30),
        new Date(2021, 7, 31),
        new Date(2021, 8, 7),
        new Date(2021, 8, 8),
        new Date(2021, 8, 20),
        new Date(2021, 8, 21),
        new Date(2021, 9, 10),
        new Date(2021, 9, 11),
        new Date(2021, 9, 25),
        new Date(2021, 10, 1),
        new Date(2021, 10, 2),
        new Date(2021, 10, 3),
        new Date(2021, 10, 9),
        new Date(2021, 10, 10),
        new Date(2021, 11, 6),
        new Date(2021, 12, 3),
        new Date(2021, 12, 4)
    ];
}

// override this query with your own questions!
const SPREADSHEET_QUERY = graphql`
  query eventsQuery {
    site {
      siteMetadata {
        limitMonthInTheFuture
      }
    }
    allGoogleSheetEventsRow {
      nodes {
        id
        eventName: nameoftheevent
        eventDesc: description
        date: date
        hour: time
        eventLink: facebookeventurl
        place: location
      }
    }
  }
`;

const CalendarPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<ModalData>();

  const { allGoogleSheetEventsRow, site } = useStaticQuery(SPREADSHEET_QUERY);
  const { limitMonthInTheFuture } = site.siteMetadata;

  unavailableDates.forEach((d, i) => {

      allGoogleSheetEventsRow.nodes.push({
          id: "unavailable_" + i,
          eventName: "Unavailable",
          eventDesc: "Unavailable",
          date: (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear(),
          hour: "8:00:00 PM"
      });
  });

  const months = useMemo(
    () =>
      groupEventsByMonth(allGoogleSheetEventsRow.nodes, limitMonthInTheFuture),
    [allGoogleSheetEventsRow.nodes, limitMonthInTheFuture],
  );

  const openModal = useCallback((data: ModalData) => {
    setModalData(data);
    setShowModal(true);
  }, []);

  return (
    <CalendarLayout>

      <Box id="calendars" animation="fadeIn" 
    background={{
    "image": "url(/images/web_bg.jpg)",
    "position": "center",
    "size": "cover",
    "color": "black"
  }} >
    <a href="/"><Image src={headerImage} alt="Events" width="100%" height="auto" /></a><br/>
        <Box pad="medium">
            <Button alignSelf="start" href="/" icon={<LinkPrevious />} label="Back home" />
            <Box margin="medium" pad="medium" background="neutral-2">
                We'd love to bring the party to YOU! Contact us to book your Wedding, Event, or any kind of party you want to make EPIC and UNFORGETTABLE!
            </Box>
        </Box>
        {months.map((month) => (
          <Month
            key={format(month.startDate, 'MM')}
            openModal={openModal}
            {...month}
          />
        ))}
      </Box>
      {showModal && (
        <ModalEvent onClose={() => setShowModal(false)} {...modalData!} />
      )}

    </CalendarLayout>
  );
};

export default CalendarPage;
