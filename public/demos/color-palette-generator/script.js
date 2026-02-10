// カラーパレットジェネレータ
class ColorPaletteGenerator {
  constructor() {
    this.colors = [];
    this.lockedIndices = new Set();
    this.init();
  }

  init() {
    this.generatePalette();
    this.setupEventListeners();
  }

  // ランダムな HEX カラーを生成
  generateRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  }

  // カラーパレットを生成（ロックされた色は保持）
  generatePalette() {
    const newColors = [];
    for (let i = 0; i < 5; i++) {
      if (this.lockedIndices.has(i) && this.colors[i]) {
        newColors.push(this.colors[i]);
      } else {
        newColors.push(this.generateRandomColor());
      }
    }
    this.colors = newColors;
    this.render();
  }

  // カラーカードをレンダリング
  render() {
    const container = document.getElementById('paletteContainer');
    container.innerHTML = '';

    this.colors.forEach((color, index) => {
      const card = document.createElement('div');
      card.className = `color-card ${this.lockedIndices.has(index) ? 'locked' : ''}`;
      card.dataset.index = index;

      const hex = color.toUpperCase();
      const isLocked = this.lockedIndices.has(index);

      card.innerHTML = `
        <div class="color-preview" style="background-color: ${color}"></div>
        <div class="color-info">
          <div class="color-hex">
            <span>${hex}</span>
            <span class="lock-icon ${isLocked ? 'locked' : ''}" data-index="${index}">
              ${isLocked ? '🔒' : '🔓'}
            </span>
          </div>
          <div class="copy-hint">クリックでコピー</div>
        </div>
      `;

      // カラーカード全体をクリックでコピー
      card.addEventListener('click', (e) => {
        // ロックアイコンをクリックした場合はロック処理のみ
        if (e.target.classList.contains('lock-icon')) {
          e.stopPropagation();
          this.toggleLock(index);
          return;
        }
        this.copyToClipboard(hex);
      });

      container.appendChild(card);
    });
  }

  // ロックのトグル
  toggleLock(index) {
    if (this.lockedIndices.has(index)) {
      this.lockedIndices.delete(index);
    } else {
      this.lockedIndices.add(index);
    }
    this.render();
  }

  // すべてのロックを解除
  unlockAll() {
    this.lockedIndices.clear();
    this.render();
  }

  // クリップボードにコピー
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      this.showToast(`カラーコード "${text}" をコピーしました！`);
    } catch {
      // フォールバック: 古いブラウザ対応
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        this.showToast(`カラーコード "${text}" をコピーしました！`);
      } catch {
        this.showToast('コピーに失敗しました');
      }
      document.body.removeChild(textArea);
    }
  }

  // トースト通知を表示
  showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideUp 0.3s ease reverse';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 2000);
  }

  // イベントリスナーの設定
  setupEventListeners() {
    document.getElementById('generateBtn').addEventListener('click', () => {
      this.generatePalette();
    });

    document.getElementById('lockAllBtn').addEventListener('click', () => {
      this.unlockAll();
    });
  }
}

// アプリケーションを初期化
document.addEventListener('DOMContentLoaded', () => {
  new ColorPaletteGenerator();
});
