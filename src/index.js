/* @flow */

import React, { PureComponent } from "react";
import "./index.css";

type Props = {
  images: Array,
  direction: String,
  isTouch: String,
  numberOfThumpImage: number,
  zoomInIcon: Element,
  zoomOutIcon: Element,
  nextIcon: Element,
  previousIcon: Element,
  gapBetweenThumbnail: number,
  isButtom: Boolean
};

type State = {
  images: Array,
  index: number,
  sizeWidth: number,
  sizeOfTranslate: number,
  numberOfThumpImage: number,
  swiperSlideWidth: number,
  clientX: number,
  clientY: number
};

class ThumbnailSlider extends PureComponent<Props, State> {
  state = {
    index: 0,
    sizeWidth: 486,
    sizeOfTranslate: 0,
    allIndex: [],
    swiperSlideWidth: 0,
    swiperSlideHeight: undefined,
    clientX: 0,
    clientY: 0,
    leftX: undefined,
    endClintX: undefined,
    resXX: 0,
    newValueX: 0,
    valueX: 0,
    objheY: undefined,
    secondIndex: 2,
    firstIndex: 0,
    zoom: false
  };

  componentDidMount() {
    const {
      direction,
      isTouch,
      numberOfThumpImage,
      gapBetweenThumbnail
    } = this.props;

    if (numberOfThumpImage) {
      this.setState({
        secondIndex: numberOfThumpImage - 1
      });
    }

    const thumbnailSlideList =
      direction === "horizontal"
        ? document.querySelectorAll(".thumbnail-slide")
        : document.querySelectorAll(".thumbnail-slideVer");

    thumbnailSlideList[0].classList.add("thumbnail-slide-active");

    const initialSizeOfSwiper =
      direction === "horizontal"
        ? document
            .querySelector(".standard-product-column-left")
            .getBoundingClientRect()
        : document
            .querySelector(".standard-product-column-leftVertical")
            .getBoundingClientRect();

    const swiperSlide =
      direction === "horizontal"
        ? document.querySelector(".thumbnail-slide").getBoundingClientRect()
        : document.querySelector(".thumbnail-slideVer").getBoundingClientRect();

    const newswiperSlide =
      swiperSlide.height === 0 || swiperSlide.height === undefined
        ? 133
        : swiperSlide.height;

    const rightResultForHeight =
      numberOfThumpImage * newswiperSlide +
      numberOfThumpImage * gapBetweenThumbnail;

    this.setState({
      swiperSlideHeight: rightResultForHeight,
      sizeWidth: initialSizeOfSwiper.width
    });

    // handleTouch method for screen mobile and tablet
    if (isTouch !== "false") {
      this.handleTouch();
    }

    window.addEventListener("resize", () => {
      const { direction } = this.props;
      const SizeOfSwiper =
        direction === "horizontal"
          ? document
              .querySelector(".standard-product-column-left")
              .getBoundingClientRect()
          : document
              .querySelector(".standard-product-column-leftVertical")
              .getBoundingClientRect();

      const swiperSlideResize =
        direction === "horizontal"
          ? document.querySelector(".thumbnail-slide").getBoundingClientRect()
          : document
              .querySelector(".thumbnail-slideVer")
              .getBoundingClientRect();

      const rightResultForHeightresize =
        numberOfThumpImage * swiperSlideResize.height +
        numberOfThumpImage * gapBetweenThumbnail;

      this.setState({
        swiperSlideHeight: rightResultForHeightresize,
        swiperSlideWidth: SizeOfSwiper.width,
        sizeWidth: SizeOfSwiper.width,
        sizeOfTranslate: 0
      });
    });
  }

  handleZoomer = () => {
    const ball = document.querySelector(".swiper-wrapper");

    const objeHeight = {
      objeHeightY: () => {
        const clickBall = document
          .querySelector(".swiper-wrapper")
          .getBoundingClientRect();
        this.setState({
          objheY: clickBall
        });
      }
    };

    function exma() {
      objeHeight.objeHeightY();
    }

    ball.addEventListener("mouseenter", exma);

    ball.addEventListener("mousedown", event => {
      const shiftX =
        event.clientX - ball.getBoundingClientRect().x + this.state.objheY.x;
      const shiftY =
        event.clientY - ball.getBoundingClientRect().y + this.state.objheY.y;

      const handleSetState = {
        getCalculate: e => {
          this.setState({
            clientX: e.pageX - shiftX,
            clientY: e.clientY - shiftY
          });
        }
      };

      handleSetState.getCalculate(event);

      function calculateTransformZoom(e) {
        handleSetState.getCalculate(e);
      }

      ball.addEventListener("mousemove", calculateTransformZoom);

      ball.addEventListener("mouseup", e => {
        ball.removeEventListener("mousemove", calculateTransformZoom);
      });

      ball.addEventListener("mouseleave", () => {
        ball.removeEventListener("mousemove", calculateTransformZoom);
        ball.removeEventListener("mouseenter", exma);
      });
    });

    document.querySelector(".swiper-wrapper").ondragstart = function() {
      return false;
    };
  };

  handleTouch = () => {
    const allImages = document.querySelectorAll(".Img");
    allImages.forEach(elemet => {
      let start;
      let end;
      elemet.addEventListener("touchstart", ev => {
        start = Math.round(ev.changedTouches[0].pageX);
      });
      elemet.addEventListener("touchend", ev => {
        end = Math.round(ev.changedTouches[0].pageX);
        if (start > end) {
          this.handleNext();
        }
        if (start < end) {
          this.handlePrevious();
        }
      });
    });
  };

  handlePrevious = () => {
    const { direction } = this.props;
    const { index } = this.state;
    const thumbnailSlideList =
      direction === "horizontal"
        ? document.querySelectorAll(".thumbnail-slide")
        : document.querySelectorAll(".thumbnail-slideVer");
    const swiperSlide =
      direction === "horizontal"
        ? document
            .querySelector(".standard-product-column-left")
            .getBoundingClientRect().width
        : document
            .querySelector(".standard-product-column-leftVertical")
            .getBoundingClientRect().width;
    if (index > 0) {
      this.setState({ index: index - 1, swiperSlideWidth: swiperSlide });
      this.handleChangeTransform(thumbnailSlideList[index - 1], index - 1);
    }
    this.handleZoomOut();
  };

  handleNext = () => {
    const { direction, images } = this.props;
    const { index } = this.state;
    const thumbnailSlideList =
      direction === "horizontal"
        ? document.querySelectorAll(".thumbnail-slide")
        : document.querySelectorAll(".thumbnail-slideVer");

    const swiperSlide =
      direction === "horizontal"
        ? document
            .querySelector(".standard-product-column-left")
            .getBoundingClientRect().width
        : document
            .querySelector(".standard-product-column-leftVertical")
            .getBoundingClientRect().width;

    if (index + 1 <= images.length - 1) {
      this.setState({
        index: index + 1,
        swiperSlideWidth: swiperSlide
      });
      this.handleChangeTransform(thumbnailSlideList[index + 1], index + 1);
    }

    this.handleZoomOut();
  };

  handleChangeTransform = (el, index) => {
    const { secondIndex, sizeOfTranslate, firstIndex } = this.state;
    const { direction, gapBetweenThumbnail } = this.props;
    const Element = el.target ? el.target : el;

    const imgheightAndWidth =
      direction === "vertical"
        ? Element.getBoundingClientRect().height + gapBetweenThumbnail
        : document.querySelector(".thumbnail-slide").getBoundingClientRect()
            .width + 8;
    if (index === secondIndex) {
      this.setState({
        sizeOfTranslate: sizeOfTranslate - imgheightAndWidth,
        secondIndex: secondIndex + 1,
        firstIndex: firstIndex + 1
      });
    }
    if (index === firstIndex) {
      this.setState({
        sizeOfTranslate: sizeOfTranslate + imgheightAndWidth,
        secondIndex: secondIndex - 1,
        firstIndex: firstIndex - 1
      });
    }
    if (index === 0) {
      this.setState({
        sizeOfTranslate: 0,
        secondIndex,
        firstIndex: 0
      });
    }

    const thumbnailSlideList =
      direction === "horizontal"
        ? document.querySelectorAll(".thumbnail-slide")
        : document.querySelectorAll(".thumbnail-slideVer");

    thumbnailSlideList.forEach(elemet => {
      elemet.classList.remove("thumbnail-slide-active");
    });

    thumbnailSlideList[index].classList.add("thumbnail-slide-active");

    this.handleZoomOut();

    const swiperSlide =
      direction === "horizontal"
        ? document
            .querySelector(".standard-product-column-left")
            .getBoundingClientRect().width
        : document
            .querySelector(".standard-product-column-leftVertical")
            .getBoundingClientRect().width;

    this.setState({
      swiperSlideWidth: swiperSlide
    });
  };

  handleChangeThumbnail = i => {
    this.setState({ index: i });
  };

  handleZoomin = () => {
    const clickBall = document
      .querySelector(".swiper-wrapper")
      .getBoundingClientRect();
    this.setState({
      zoom: true,
      objheY: clickBall,
      clientX: 0,
      clientY: 0
    });
    this.handleZoomer();
  };

  handleZoomOut = () => {
    this.setState({
      zoom: false
    });
  };

  render() {
    const {
      index,
      sizeWidth,
      sizeOfTranslate,
      swiperSlideWidth,
      swiperSlideHeight,
      clientX,
      clientY,
      zoom
    } = this.state;

    const {
      numberOfThumpImage,
      zoomInIcon,
      nextIcon,
      zoomOutIcon,
      previousIcon,
      gapBetweenThumbnail,
      isButtom
    } = this.props;

    const newclientX = clientX;
    const newclientY = clientY;

    const { direction, images } = this.props;

    const range = sizeWidth === 100 ? "%" : "px";

    const styleHori = {
      marginRight: "8px",
      width: `calc((100% - ${gapBetweenThumbnail}px) / ${numberOfThumpImage})`
    };
    const styleVer = {
      marginBottom: `${gapBetweenThumbnail}px`
    };

    const styleVerContainer = {
      height: `${swiperSlideHeight}px`
    };

    const transformY = {
      transform: `translateY(${sizeOfTranslate}px)`
    };

    const transformX = {
      transform: `translateX(${sizeOfTranslate}px)`
    };

    const scale = zoom === false ? 1 : 2;

    const zoomStyle = {
      transform: `scale(${scale})`,
      left: `${newclientX}px`,
      top: `${newclientY}px`,
      transition: "none 0s ease 0s"
    };

    const zoomer = zoom === true ? zoomStyle : {};

    const style = direction === "horizontal" ? styleHori : styleVer;
    const styleVER = direction === "vertical" ? styleVerContainer : {};
    const styleTransform = direction === "horizontal" ? transformX : transformY;

    return (
      <div
        className={
          direction === "horizontal"
            ? "standard-product-column-left"
            : "standard-product-column-leftVertical"
        }
      >
        <div className="u-centred">
          <button
            className="swiper-button-prev"
            onClick={() => this.handlePrevious()}
          >
            {previousIcon}
          </button>
          <button
            className="swiper-button-next"
            onClick={() => this.handleNext()}
          >
            {nextIcon}
          </button>
          <ul className="swiper-wrapper" style={zoomer}>
            {images.map((el, i) => (
              <li
                key={i}
                className="swiper-slide"
                style={{
                  width: `${sizeWidth}${range}`,
                  opacity: 1,
                  transform: ` translateX(-${swiperSlideWidth * index}px)`,
                  visibility: i === index ? "visible" : "hidden"
                }}
              >
                <img src={el} className="Img" />
              </li>
            ))}
          </ul>
          <button
            className="slider-trigger-zoom"
            type="button"
            onClick={
              this.state.zoom === false
                ? () => this.handleZoomin()
                : () => this.handleZoomOut()
            }
          >
            {this.state.zoom === false ? zoomInIcon : zoomOutIcon}
          </button>
        </div>

        <div
          className={
            direction === "horizontal"
              ? "thumbnail-container"
              : "thumbnail-containerVertical"
          }
          style={styleVER}
        >
          <ul
            className={
              direction === "horizontal"
                ? "thumbnail-wrapper"
                : "thumbnail-wrapperVertical"
            }
            style={styleTransform}
          >
            {images.map((el, i) => (
              <li
                key={i}
                className={
                  direction === "horizontal"
                    ? "thumbnail-slide"
                    : "thumbnail-slideVer"
                }
                style={style}
                onClick={e => {
                  this.handleChangeTransform(e, i);
                  this.handleChangeThumbnail(i);
                }}
              >
                <img src={el} width="100vm" className="imgTH" />
              </li>
            ))}
          </ul>
        </div>
        {isButtom && (
          <div>
            <button onClick={() => this.handleNext()}>{nextIcon}</button>
            <button onClick={() => this.handlePrevious()}>
              {previousIcon}
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default ThumbnailSlider;
