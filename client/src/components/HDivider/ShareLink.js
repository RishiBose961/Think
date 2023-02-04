import React from 'react'
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  LinkedinIcon,
  LinkedinShareButton
} from "react-share";



const ShareLink = ({ linku, description }) => {
  const shareUrl = `https://think.cyclic.app/postview/${linku}`

  return (
    <div>
      <FacebookShareButton url={shareUrl} size={32} quote={description}>
        <FacebookIcon round={true} />
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl} size={32} quote={description}>
        <TwitterIcon round={true} />
      </TwitterShareButton>
      <WhatsappShareButton url={shareUrl} size={32} quote={description}>
        <WhatsappIcon round={true} />
      </WhatsappShareButton>
      <RedditShareButton url={shareUrl} size={32} quote={description}>
        <RedditIcon round={true} />
      </RedditShareButton>
      <TelegramShareButton url={shareUrl} size={32} quote={description}>
        <TelegramIcon round={true} />
      </TelegramShareButton>
      <LinkedinShareButton url={shareUrl} size={32} quote={description}>
        <LinkedinIcon round={true} />
      </LinkedinShareButton>
    </div>
  )
}

export default ShareLink