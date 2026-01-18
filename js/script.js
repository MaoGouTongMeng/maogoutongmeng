// ========== 猫咪大图预览功能 ========== 
const catImgs = document.querySelectorAll('.cat-img');
const imgModal = document.getElementById('imgModal');
const modalImg = document.getElementById('modalImg');
const modalClose = document.getElementById('modalClose');

// 只有当所有必要的DOM元素都存在时，才执行大图预览功能
if (catImgs.length > 0 && imgModal && modalImg && modalClose) {
    // 点击猫咪图片打开大图
    catImgs.forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            modalImg.src = img.src;
            imgModal.classList.add('active');
            // 重置大图样式
            modalImg.style.transform = 'translate(0, 0) scale(1)';
            modalImg.dataset.scale = 1;
            modalImg.dataset.x = 0;
            modalImg.dataset.y = 0;
        });
    });

    // 关闭大图的方式1：点击关闭按钮
    modalClose.addEventListener('click', () => {
        imgModal.classList.remove('active');
    });

    // 关闭大图的方式2：点击遮罩层
    imgModal.addEventListener('click', (e) => {
        if (e.target === imgModal) {
            imgModal.classList.remove('active');
        }
    });

    // 关闭大图的方式3：按ESC键
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && imgModal.classList.contains('active')) {
            imgModal.classList.remove('active');
        }
    });

    // ========== 大图拖拽功能 ========== 
    let isDragging = false;
    let startX, startY;

    modalImg.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX - parseFloat(modalImg.dataset.x || 0);
        startY = e.clientY - parseFloat(modalImg.dataset.y || 0);
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const x = e.clientX - startX;
        const y = e.clientY - startY;
        modalImg.dataset.x = x;
        modalImg.dataset.y = y;
        modalImg.style.transform = `translate(${x}px, ${y}px) scale(${modalImg.dataset.scale || 1})`;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // ========== 大图缩放功能 ========== 
    modalImg.addEventListener('wheel', (e) => {
        e.preventDefault();
        const currentScale = parseFloat(modalImg.dataset.scale || 1);
        // 滚轮向上放大，向下缩小，限制缩放范围0.5-3倍
        const newScale = Math.max(0.5, Math.min(3, currentScale - (e.deltaY / 1000)));
        modalImg.dataset.scale = newScale;
        modalImg.style.transform = `translate(${modalImg.dataset.x || 0}px, ${modalImg.dataset.y || 0}px) scale(${newScale})`;
    });
}