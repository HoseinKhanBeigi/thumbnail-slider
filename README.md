## Install

Install with NPM

```
npm i thumbnail-slide-react --save
```

Install with yarn

```
yarn add thumbnail-slide-react
```

## Usage


```js
import ThumbnailSlider from "thumbnail-slide-react";
import { Icon } from "antd";

<main className="mainOne">
  <div className="standard-product-page-main">
    <div className="standard-product-container">
      <ThumbnailSlider
        images={images}
        direction="horizontal || vertical"
        isTouch="true"
        numberOfThumpImage={5}
        gapBetweenThumbnail={30}
        isButtom={false}
        previousIcon={<Icon type="left" className="arrow" />}
        nextIcon={<Icon type="right" className="arrow" />}
        zoomInIcon={<Icon type="zoom-in" className="arrow" />}
        zoomOutIcon={<Icon type="zoom-out" className="arrow" />}
      />
    </div>
  </div>
</main>;
```

```css
.mainOne {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
  width: calc(100% - 32px);
}

.standard-product-page-main {
  width: calc(100% + 32px);
  margin-left: -16px;
  margin-right: -16px;
  position: relative;
  margin-top: 0;
}

.standard-product-container {
  display: flex;
  justify-content: space-between;
  max-width: 100%;
  flex-direction: column;
  -webkit-box-pack: justify;
}
```

# License

The code and the documentation are released under the [MIT License](LICENSE).
