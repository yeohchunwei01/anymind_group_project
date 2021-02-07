import React, {
  useContext, useEffect, useMemo, useState,
} from 'react'
import { MdDehaze } from 'react-icons/md'
import { useMediaQuery } from 'react-responsive'
import { css, cx } from '@emotion/css'
import { channels, users } from '@/common/const'
import Box from '@/components/Box'
import Drawer from '@/components/Drawer'
import Grid from '@/components/Grid'
import Select, { MenuItem } from '@/components/Select'
import Typography from '@/components/Typography'
import { ChannelContext } from '@/contexts/ChannelContext'
import { UserContext } from '@/contexts/UserContext'

// this layout is created and support for screen resize

interface AppLayoutProps {
  children?: Array<React.ReactElement> | React.ReactElement
}

function AppLayout({ children }: AppLayoutProps) {
  const [channel, setChannel] = useContext(ChannelContext)
  const [user, setUser] = useContext(UserContext)
  const [drawer, setDrawer] = useState<boolean>(true)
  const drawerWidth = 320

  const isSmallScreen = useMediaQuery({ query: '(max-width: 815px)' })

  const selectedChannel = useMemo<string>(() => {
    let title = ''
    const item = channels.find((item) => item.value === channel)
    if (item) title = item.title

    return title
  }, [channel])

  useEffect(() => {
    if (!isSmallScreen) setDrawer(true)
  }, [isSmallScreen])

  return (
    <Grid>
      <Drawer
        fixed={!isSmallScreen}
        open={drawer}
        width={drawerWidth}
        onClose={() => setDrawer(false)}
      >
        <Grid>
          <Grid>
            <Box mx={10} my={15}>
              <Typography>1. Choose your user</Typography>
            </Box>
          </Grid>

          <Grid>
            <Select value={user} onChange={(e) => setUser(e.target.value)}>
              {users.map((item, index) => (
                <MenuItem key={index} value={item.value}>{item.title}</MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid>
            <Box mx={10} my={15}>
              <Typography>2. Choose your Channel</Typography>
            </Box>
          </Grid>

          <Grid>
            {channels.map((item, index) => (
              <Grid
                className={
                cx(classes.channelContainer,
                  { [classes.channelContainerActive]: item.value === channel })
                }
                key={index}
                onClick={() => setChannel(item.value)}
              >
                <Box mb={16}>
                  <Typography fontWeight={600} fontSize={14}>
                    {item.title}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Drawer>
      <Grid style={{ marginLeft: !isSmallScreen ? drawerWidth : 0 }}>
        <Grid alignItems="center" className={classes.topBar}>
          <Box px={15}>
            <Grid container>
              {isSmallScreen && (
                <Grid alignItems="center" justifyContent="center" xs={1}>
                  <Box mr={10}>
                    <MdDehaze
                      size={20}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setDrawer(true)}
                    />
                  </Box>
                </Grid>
              )}
              <Grid xs={11}>
                <Typography>{selectedChannel}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid>{children}</Grid>
      </Grid>
    </Grid>
  )
}

AppLayout.defaultProps = {
  children: null,
}

const classes = {
  channelContainer: css`
    border-bottom: 1px solid #f0f4f8;
    cursor: pointer;
    padding: 10px 1rem;
    &:hover {
        background-color: #ffffff;
        background-image: -webkit-linear-gradient(right, #e9eff5, #ffffff);
    }
  `,
  channelContainerActive: css`
    background-color: #ffffff;
    background-image: -webkit-linear-gradient(right, #f7f9fb, #ffffff);
  `,
  topBar: css`
    background-color: #f4f5fb;
    border-bottom: 1px solid #e6ecf3;
    height: 64px;
  `,
}

export default AppLayout
