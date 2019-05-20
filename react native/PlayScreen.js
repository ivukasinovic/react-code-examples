import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Expo from "expo";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";

import { FILES_DIRECTORY_PATH } from "../../constants";
import I18n from "../../i18n";
import log from "../../helpers/Logger";
import getFormatedDate from "../../helpers/getFormatedDate";
import styleBase from "../../style/base";

class PlayScreen extends Component {
  constructor(props) {
    super(props);
    this.sound = null;
    this.state = {
      recordName: "",
      timing: [],
      isPlaying: false,
      positionPercent: 0,
      durationMillis: 0,
      positionMillis: 0,
      index: 0,
      endTime: 0,
      speakerNumber: null
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const { recordName, speakerNumber, timing } = navigation.getParam("config");

    speakerNumber && timing
      ? this.setState({
          recordName,
          speakerNumber,
          timing,
          endTime: timing ? timing[0].endTime : 0,
          startTime: timing ? timing[0].startTime : 0,
          index: 0
        })
      : this.setState({ recordName });
    await this.initializeRecord(recordName);
    this.playRecord();
  }

  async initializeRecord(recordName) {
    this.sound = new Expo.Audio.Sound();
    this.sound.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);

    const recordPath = {
      uri: `${FILES_DIRECTORY_PATH.recordings}${recordName}`
    };
    try {
      await this.sound.loadAsync(recordPath);
    } catch (error) {
      log(error);
    }
  }

  playNextSegment() {
    const { timing, index } = this.state;
    if (!timing[index + 1]) {
      return;
    }
    this.setState({
      index: index + 1,
      startTime: timing[index + 1].startTime,
      endTime: timing[index + 1].endTime
    });
    this.playRecord();
  }

  onPlaybackStatusUpdate = status => {
    const { durationMillis, endTime } = this.state;
    if (!durationMillis) {
      this.setState({ durationMillis: status.durationMillis });
    }
    const positionPercent = Math.round(
      (100 * status.positionMillis) / status.durationMillis
    );
    if (endTime && status.positionMillis > endTime) {
      this.stopRecord();
      this.playNextSegment();
      return;
    }
    if (status.didJustFinish) {
      this.stopRecord();
      return;
    }
    this.setState({ positionPercent, positionMillis: status.positionMillis });
  };

  async playRecord() {
    const { startTime } = this.state;
    if (!this.sound) {
      return;
    }
    if (this.state.isPlaying) {
      this.setState({ isPlaying: false });
      this.sound.pauseAsync();
      return;
    }
    this.setState({ isPlaying: true });
    this.sound.setPositionAsync(startTime);
    await this.sound.playAsync();
  }

  async stopRecord() {
    this.setState({ isPlaying: false });
    await this.sound.stopAsync();
  }

  async pauseRecord() {
    await this.sound.pauseAsync();
  }

  render() {
    const {
      recordName,
      positionPercent,
      durationMillis,
      positionMillis,
      speakerNumber
    } = this.state;
    return (
      <View style={[styles.whiteContainer, styles.pad, styles.recordMf]}>
        <View style={styles.sectionHeader}>
          <Text>{recordName}</Text>
          <Text
            style={[styles.textHeading, styles.textBold, styles.textCenter]}
          >
            {I18n.t("meetingStats.speaker")} {speakerNumber}
          </Text>
        </View>

        <View>
          <Text style={styles.textCenter}>{positionPercent}%</Text>
          <View
            style={[styles.inline, styles.alignCenter, styles.justifyCenter]}
          >
            <Text style={[styles.textGreen, styles.textXl]}>
              {getFormatedDate("mm:ss", moment(positionMillis))}/
            </Text>
            <Text style={[styles.textGreen, styles.textXl]}>
              {getFormatedDate("mm:ss", moment(durationMillis))}
            </Text>
          </View>
        </View>

        <View style={[styles.justifyCenter, styles.inline, styles.alignCenter]}>
          <TouchableOpacity
            style={styles.gapRightSm}
            onPress={() => this.playRecord()}
          >
            {this.state.isPlaying ? (
              <FontAwesome name="pause-circle" size={56} color="grey" />
            ) : (
              <FontAwesome name="play-circle" size={56} color="blue" />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.stopRecord()}>
            <FontAwesome name="stop-circle" size={24} color="grey" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default PlayScreen;

const styles = StyleSheet.create(styleBase);
