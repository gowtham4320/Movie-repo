import { IconButton, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import "./trailer.styl";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

interface watchMovieProps {
  open: boolean;
  imdbId: string;
  clearWatchList: () => void;
}

export default function WatchMovieComponent(props: watchMovieProps) {
  const { open, imdbId, clearWatchList } = props;
  const [openTrailer, setOpenTrailer] = useState<boolean>(open);

  const handleTrailerClose = () => {
    clearWatchList();
    setOpenTrailer(false)
  }

  useEffect(() => {
    if (open && imdbId) {
      setOpenTrailer(true)
    }
  });
  return (
    <>
      <Modal open={openTrailer} onClose={handleTrailerClose} className="trailerModal">
        <div className="trailerOuterBody">
          <div className="trailerCloseButton">
            <IconButton size="large" type="button" color="secondary" onClick={handleTrailerClose}>
              <CancelRoundedIcon fontSize="large" className="trailerCloseIcon" />
            </IconButton>
          </div>
          <div className="traileriframeBody">
            <iframe
              src={`https://streamimdb.ru/embed/movie/${imdbId}/`}
              title="video player"
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
