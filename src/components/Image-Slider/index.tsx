import React, {Component} from 'react';
// @ts-ignore
import ImageSliderz from 'react-native-image-slideshow';
import {IS_BIG_SCREEN} from '../../config';
interface IState {
  position: number;
  interval: any;
}
interface ImageOnPress {
  image: {
    title?: string;
    caption?: string;
    url: string;
  };
  index: number;
}

interface IProp {
  dataSource: {
    title?: string;
    caption?: string;
    url: string;
  }[];
  height?: number;
  scrollEnabled?: boolean;
  overlay?: boolean;
  containerStyle?: boolean;
  onPress?: (value: ImageOnPress) => void;
}
export class ImageSlider extends Component<IProp, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      position: 1,
      interval: null,
    };
  }

  componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position:
            this.state.position === this.props.dataSource.length - 1
              ? 0
              : this.state.position + 1,
        });
      }, 2000),
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    return (
      <ImageSliderz
        height={IS_BIG_SCREEN ? 400 : 200}
        position={this.state.position}
        onPositionChanged={(position: number) => this.setState({position})}
        {...this.props}
      />
    );
  }
}
