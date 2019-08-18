import React from 'react';
import OpenWaitTime from './OpenWaitTime';
import ClosedWaitTime from './ClosedWaitTime';
import AtCapacityWaitTime from './AtCapacityWaitTime';
import { ipcRenderer } from 'electron';
import {
  MedimapData,
  isMedimapData,
  isMedimapOpenData,
  isMedimapClosedData,
  isMedimapAtCapacityData,
} from '../../medimap-data';

interface WaitTimeState {
  lastMsg: MedimapData | null,
}

/**
 * Displays the open / closed status and the wait time of a clinic, using data
 * from electron's main process transmitted via ipc.
 */
class WaitTime extends React.Component<{}, WaitTimeState> {
  state: Readonly<WaitTimeState> = {
    lastMsg: null,
  };

  private onIpcDataRecieved = (_e: any, msg: any) => {
    console.log('Got msg', msg);
    if (isMedimapData(msg)) {
      this.setState({ lastMsg: msg });
    }
  }

  componentDidMount() {
    ipcRenderer.addListener('medimap-new-data', this.onIpcDataRecieved);
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('medimap-new-data', this.onIpcDataRecieved);
  }

  render() {
    const { lastMsg } = this.state;

    if (lastMsg === null) {
      // We haven't gotten any data yet.
      return <OpenWaitTime lastUpdated='a while ago' waitTime={0} />;
    }
    else if (isMedimapOpenData(lastMsg)) {
      // Clinic is open and accepting patients.
      return <OpenWaitTime lastUpdated={lastMsg.lastUpdated} waitTime={lastMsg.waitTime} />;
    }
    else if (isMedimapClosedData(lastMsg)) {
      // Clinic is closed.
      return <ClosedWaitTime />;
    }
    else if (isMedimapAtCapacityData(lastMsg)) {
      // Clinic is open, but not accepting patients.
      return <AtCapacityWaitTime />;
    }
    else {
      // TODO: Replace the below with an error component!
      return <OpenWaitTime lastUpdated='I dunno. Something weird is going on.' waitTime={-Infinity} />;
    }
  }
}

export default WaitTime;
