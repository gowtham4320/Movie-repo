import { IconButton, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import "./trailer.styl";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

interface trailerViewProps {
  open: boolean;
  trailerKey?: string;
  clearTrailers: ()=>void;
}

export default function TrailerViewComponent(props: trailerViewProps) {
  const { open, trailerKey, clearTrailers } = props;
  const [openTrailer,setOpenTrailer] = useState<boolean>(open);

  const handleTrailerClose = () => {
    clearTrailers();
    setOpenTrailer(false)
  }

  useEffect(() => {
    if(open&&trailerKey){
      setOpenTrailer(true)
    }
  });
  return (
    <>
      <Modal open={openTrailer} onClose={handleTrailerClose} className="trailerModal">
        <div className="trailerOuterBody">
          <div className="trailerCloseButton">
            <IconButton size="large" type="button" color="secondary" onClick={handleTrailerClose}>
              <CancelRoundedIcon fontSize="large"/>
            </IconButton>
          </div>
          <div className="traileriframeBody">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
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
