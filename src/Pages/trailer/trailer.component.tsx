import { IconButton, Modal } from "@mui/material";
import { useEffect } from "react";
import "./trailer.styl";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

interface trailerViewProps {
  open: boolean;
  handleClose: () => void;
}

export default function TrailerView(props: trailerViewProps) {
  const { open, handleClose } = props;
  useEffect(() => {}, []);
  return (
    <>
      <Modal open={open} onClose={handleClose} className="trailerModal">
        {/* <video controls width="50%">
      <source src={"https://www.youtube.com/watch?v=tOM-nWPcR4U"} type="video/mkv" />
      Sorry, your browser doesn't support videos.
    </video> */}
        <div className="trailerOuterBody">
          <div className="trailerCloseButton">
            <IconButton size="large" type="button" color="secondary" onClick={handleClose}>
              <CancelRoundedIcon fontSize="large"/>
            </IconButton>
          </div>
          <div className="traileriframeBody">
            <iframe
              src="https://www.youtube.com/embed/tOM-nWPcR4U?si=-CdS7OX69SvilXnm"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="traileriframe"
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
