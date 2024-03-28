document.addEventListener("DOMContentLoaded", function () {
    const btnLeft = document.querySelector(".left-btn");
    const tabMenu = document.querySelector(".tab-menu");
    const btnRight = document.querySelector(".right-btn");

    let clickedRight = false; // Biến để theo dõi xem đã nhấp vào btnRight hay chưa

    const iconVisibility = () => {
        let scrollLeftValue = Math.ceil(tabMenu.scrollLeft);
        let scrollableWidth = tabMenu.scrollWidth - tabMenu.clientWidth;

        // Hiển thị hoặc ẩn nút btnLeft
        btnLeft.style.display = (scrollLeftValue > 0 || clickedRight) ? "block" : "none";

        // Hiển thị hoặc ẩn nút btnRight
        btnRight.style.display = scrollableWidth > scrollLeftValue ? "block" : "none";
    };


    // Gọi hàm iconVisibility ban đầu
    iconVisibility();

    btnRight.addEventListener("click", function () {
        tabMenu.scrollLeft += 150;
        setTimeout(iconVisibility, 50);
        clickedRight = true; // Gán clickedRight thành true khi nhấp vào btnRight
    });

    btnLeft.addEventListener("click", function () {
        tabMenu.scrollLeft -= 150;
        setTimeout(iconVisibility, 50);
    });

    // Bắt sự kiện khi kích thước của tab menu thay đổi
    window.addEventListener("resize", function () {
        // Gọi lại hàm iconVisibility khi kích thước thay đổi
        iconVisibility();
    });

    // Xử lý sự kiện khi toàn bộ nội dung đã được tải
    window.onload = function () {
        btnRight.style.display = tabMenu.scrollWidth > tabMenu.clientWidth || tabMenu.scrollWidth >= window.innerWidth ? "block" : "none";
        btnLeft.style.display = tabMenu.scrollWidth >= window.innerWidth ? "" : "none";
    };

    // Xử lý sự kiện khi kích thước của cửa sổ thay đổi
    window.onresize = function () {
        btnRight.style.display = tabMenu.scrollWidth > tabMenu.clientWidth || tabMenu.scrollWidth >= window.innerWidth ? "block" : "none";
        btnLeft.style.display = tabMenu.scrollWidth >= window.innerWidth ? "" : "none";

        let scrollLeftValue = Math.round(tabMenu.scrollLeft);
        btnLeft.style.display = scrollLeftValue > 0 ? "block" : "none";
    };
    let activeDrag = false;

    tabMenu.addEventListener("mousemove", (drag) => {
        if (!activeDrag) return;
        tabMenu.scrollLeft -= drag.movementX;
        iconVisibility();
        tabMenu.classList.add("dragging");
    });

    document.addEventListener("mouseup", () => {
        activeDrag = false;
        tabMenu.classList.remove("dragging");
    });

    tabMenu.addEventListener("mousedown", () => {
        activeDrag = true;
    });

    //JS xem cac tab content khi click button
    const tabs = document.querySelectorAll(".tab");
    const tabBtns = document.querySelectorAll(".tab-btn");

    const tab_Nav = function (tabBtnClick) {
        tabBtns.forEach((tabBtn) => {
            tabBtn.classList.remove("active");
        });

        tabs.forEach((tab) => {
            tab.classList.remove("active");
        });

        tabBtns[tabBtnClick].classList.add("active");
        tabs[tabBtnClick].classList.add("active");
    }
    tabBtns.forEach((tabBtn, i) => {
        tabBtn.addEventListener("click", () => {
            tab_Nav(i);
        });
    });
});