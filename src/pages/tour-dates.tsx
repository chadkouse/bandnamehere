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
        new Date(2022, 4, 28),
        new Date(2022, 4, 29),
        new Date(2022, 4, 30),
        new Date(2022, 5, 10),
        new Date(2022, 5, 11),
        new Date(2022, 5, 26),
        new Date(2022, 6, 9),
        new Date(2022, 6, 14),
        new Date(2022, 6, 15),
        new Date(2022, 6, 16),
        new Date(2022, 6, 17),
        new Date(2022, 6, 18),
        new Date(2022, 6, 19),
        new Date(2022, 6, 20),
        new Date(2022, 6, 21),
        new Date(2022, 6, 22),
        new Date(2022, 6, 23),
        new Date(2022, 6, 24),
        new Date(2022, 6, 25),
        new Date(2022, 6, 26),
        new Date(2022, 6, 27),
        new Date(2022, 6, 28),
        new Date(2022, 6, 29),
        new Date(2022, 6, 30),
        new Date(2022, 6, 31),
        new Date(2022, 7, 1),
        new Date(2022, 7, 2),
        new Date(2022, 7, 3),
        new Date(2022, 7, 4),
        new Date(2022, 7, 5),
        new Date(2022, 7, 6),
        new Date(2022, 7, 20),
        new Date(2022, 7, 21),
        new Date(2022, 7, 22),
        new Date(2022, 7, 23),
        new Date(2022, 7, 24),
        new Date(2022, 7, 25),
        new Date(2022, 8, 8),
        new Date(2022, 8, 9),
        new Date(2022, 8, 10),
        new Date(2022, 8, 11),
        new Date(2022, 8, 12),
        new Date(2022, 10, 5),
        new Date(2022, 11, 10)

        /** ALWAYS ADD WITH MONTH-1 so MAY is MONTH 4 **/
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
    allGoogleEventsSheet {
      nodes {
        id
        eventName: nameOfTheEvent
        eventDesc: description
        date: date
        hour: time
        eventLink: facebookEventURL
        place: location
      }
    }
  }
`;

const CalendarPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<ModalData>();

  const { allGoogleEventsSheet, site } = useStaticQuery(SPREADSHEET_QUERY);
  const { limitMonthInTheFuture } = site.siteMetadata;

  unavailableDates.forEach((d, i) => {

      allGoogleEventsSheet.nodes.push({
          id: "unavailable_" + i,
          eventName: "Unavailable",
          eventDesc: "Unavailable",
          date: (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear(),
          hour: "8:00:00 PM"
      });
  });

  const months = useMemo(
    () =>
      groupEventsByMonth(allGoogleEventsSheet.nodes, limitMonthInTheFuture),
    [allGoogleEventsSheet.nodes, limitMonthInTheFuture],
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
                <span>We'd love to bring the party to YOU! <a href='/#contact' style={{textDecoration: 'none', borderBottom: 'dotted 1px rgba(255,255,255,0.5)', color: 'white'}}>Contact us</a> to book your Wedding, Event, or any kind of party you want to make EPIC and UNFORGETTABLE!</span>
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
