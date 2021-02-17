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
