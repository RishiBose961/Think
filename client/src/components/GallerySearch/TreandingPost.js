import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';
import { TabTitle } from '../NewTab/GenerateTitle';

export default function TreandingPost() {
  TabTitle('Treanding Post');
    
  const [data, setData] = React.useState([])

  const getPosts = async () => {
    const res = await fetch('/api/auth/getpostsearch');
    await res.json()
      .then(result => {
        // console.log(result);
        setData(result.searchlist)
        // setLoading(true)
      })
  }

  React.useEffect(() => {
    getPosts()
  }, [])

  const formatter = new Intl.NumberFormat('en', {
    style: 'decimal',
    useGrouping: true,
    notation: 'compact'
  })
  return (
    <ImageList sx={{ width: "auto", height: "auto" }}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">Top Trending</ListSubheader>
      </ImageListItem>
      {data.map((item) => (
        <Link to={`/postview/${item._id}`}>
        <ImageListItem key={item.img}>
          <img
            src={`${item.thumbnail}`}
            srcSet={`${item.thumbnail}`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title.substring(0,50)}
            subtitle={`${formatter.format(item.likes.length)} Likes`} 
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.title}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
        </Link>
      ))}
    </ImageList>
  );
}
