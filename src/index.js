import "../styles/style.scss";

const el = document.querySelector(".carousel");

let offset = 0
const changeLeft = (el, fullWidth, widthImg) => {
  return () => {
    offset = offset - widthImg;
    if (offset < 0) {
      offset = fullWidth;
    }
    el.style.left = -offset + 'px';
  }
}

const changeRight = (el, fullWidth, widthImg) => {
  return () => {
    offset = offset + widthImg;
    if (offset > fullWidth) {
      offset = 0;
    }
    el.style.left = -offset + 'px';
  }
}

export const carousel = (el, widthImg) => {
  if (el !== null) {
    const btnBox = document.createElement("div")
    btnBox.className = "carousel__btn-box"
    const btnLeft = document.createElement("button")
    const btnRight = document.createElement("button")
    btnLeft.innerText = "Назад"
    btnLeft.className = "carousel-btn btn"
    btnRight.innerText = "Вперед"
    btnRight.className = "carousel-btn btn"

    btnBox.append(btnLeft)
    btnBox.append(btnRight)
    el.append(btnBox)

    const images = document.querySelectorAll(".carousel-item")
    const carouselLine = document.querySelector(".carousel-line")

    if (images[0]) {
      const offset = widthImg * (images.length - 1)
      const onClickLeft = changeLeft(carouselLine, offset, widthImg)
      const onClickRight = changeRight(carouselLine, offset, widthImg)

      btnLeft.addEventListener("click", onClickLeft)
      btnRight.addEventListener("click", onClickRight)
    }

  } else {
    console.error("не найден элемент")
  }
}

carousel(el, 800)