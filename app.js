/* ============================================================
   내일배움카드 안내 가이드 - app.js
   ============================================================ */

(function () {
  'use strict';

  const tabBtns      = document.querySelectorAll('.tab-btn');
  const stepPanels   = document.querySelectorAll('.step-panel');
  const nextStepBtns = document.querySelectorAll('.next-step-btn');
  const stepTabsNav  = document.querySelector('.step-tabs');

  // ── 단계 전환 ─────────────────────────────────────────────
  function activateStep(stepNum) {
    const n = String(stepNum);
    const isIntro = n === '0';

    // 인트로일 때 탭 네비 숨김
    stepTabsNav.classList.toggle('tabs-hidden', isIntro);

    tabBtns.forEach(function (btn) {
      const isActive = btn.dataset.step === n;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    stepPanels.forEach(function (panel) {
      const isActive = panel.dataset.step === n;
      panel.classList.toggle('active', isActive);
      if (isActive) {
        panel.removeAttribute('hidden');
      } else {
        panel.setAttribute('hidden', '');
      }
    });

    // 페이지 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      activateStep(btn.dataset.step);
    });
  });

  nextStepBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      activateStep(btn.dataset.next);
    });
  });

  // ── 로고 클릭 시 인트로로 ────────────────────────────────
  var logoBtn = document.getElementById('logo-home-btn');
  if (logoBtn) {
    logoBtn.addEventListener('click', function () {
      activateStep(0);
    });
  }

  // ── 이전 단계 버튼 ───────────────────────────────────────
  document.querySelectorAll('.prev-step-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      activateStep(btn.dataset.prev);
    });
  });

  // ── 시작하러 가기 버튼 ────────────────────────────────────
  var startBtn = document.querySelector('.start-btn');
  if (startBtn) {
    startBtn.addEventListener('click', function () {
      activateStep(startBtn.dataset.next);
    });
  }

  // ── 빠른 이동 버튼 ───────────────────────────────────────
  document.querySelectorAll('.quick-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var route = btn.dataset.route;
      activateStep(btn.dataset.goto);
      if (route) {
        activateRoute(route);
      }
    });
  });

  // ── 루트 선택 (3단계 내부) ────────────────────────────────
  function activateRoute(routeId) {
    document.querySelectorAll('.route-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.route === routeId);
    });
    document.querySelectorAll('.route-panel').forEach(function (panel) {
      var isActive = panel.id === 'route-' + routeId;
      panel.classList.toggle('active', isActive);
      if (isActive) {
        panel.removeAttribute('hidden');
      } else {
        panel.setAttribute('hidden', '');
      }
    });
  }

  document.querySelectorAll('.route-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      activateRoute(btn.dataset.route);
    });
  });

  // ── 이미지 에러 처리 ──────────────────────────────────────
  document.querySelectorAll('.substep-img').forEach(function (img) {
    img.addEventListener('error', function () {
      img.classList.add('img-error');
      img.alt = '스크린샷 준비 중';
    });
  });

  // ── 초기화: 인트로 페이지부터 시작 ──────────────────────
  activateStep(0);

})();
