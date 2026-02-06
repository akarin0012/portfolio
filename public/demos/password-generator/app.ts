/**
 * パスワードジェネレータ
 * TypeScript で実装したセキュアなパスワード生成ツール
 */

// 型定義
interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

interface PasswordStrength {
  score: number;
  label: string;
  className: string;
}

// 文字セット定義
const CHAR_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
} as const;

// DOM要素の取得（型安全）
const getElement = <T extends HTMLElement>(id: string): T => {
  const element = document.getElementById(id);
  if (!element) throw new Error(`Element with id "${id}" not found`);
  return element as T;
};

// DOM要素
const passwordDisplay = getElement<HTMLDivElement>('password');
const lengthSlider = getElement<HTMLInputElement>('lengthSlider');
const lengthValue = getElement<HTMLSpanElement>('lengthValue');
const uppercaseCheckbox = getElement<HTMLInputElement>('uppercase');
const lowercaseCheckbox = getElement<HTMLInputElement>('lowercase');
const numbersCheckbox = getElement<HTMLInputElement>('numbers');
const symbolsCheckbox = getElement<HTMLInputElement>('symbols');
const generateBtn = getElement<HTMLButtonElement>('generateBtn');
const copyBtn = getElement<HTMLButtonElement>('copyBtn');
const refreshBtn = getElement<HTMLButtonElement>('refreshBtn');
const strengthBar = getElement<HTMLDivElement>('strengthBar');
const strengthText = getElement<HTMLSpanElement>('strengthText');
const historyList = getElement<HTMLDivElement>('historyList');
const clearHistoryBtn = getElement<HTMLButtonElement>('clearHistory');

// 履歴管理
let passwordHistory: string[] = [];
const MAX_HISTORY = 5;

/**
 * 現在の設定を取得
 */
const getOptions = (): PasswordOptions => ({
  length: parseInt(lengthSlider.value, 10),
  uppercase: uppercaseCheckbox.checked,
  lowercase: lowercaseCheckbox.checked,
  numbers: numbersCheckbox.checked,
  symbols: symbolsCheckbox.checked,
});

/**
 * 暗号学的に安全な乱数を生成
 */
const getSecureRandomInt = (max: number): number => {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
};

/**
 * パスワードを生成
 */
const generatePassword = (options: PasswordOptions): string => {
  let charset = '';
  const requiredChars: string[] = [];

  // 有効な文字セットを構築
  if (options.uppercase) {
    charset += CHAR_SETS.uppercase;
    requiredChars.push(CHAR_SETS.uppercase[getSecureRandomInt(CHAR_SETS.uppercase.length)]);
  }
  if (options.lowercase) {
    charset += CHAR_SETS.lowercase;
    requiredChars.push(CHAR_SETS.lowercase[getSecureRandomInt(CHAR_SETS.lowercase.length)]);
  }
  if (options.numbers) {
    charset += CHAR_SETS.numbers;
    requiredChars.push(CHAR_SETS.numbers[getSecureRandomInt(CHAR_SETS.numbers.length)]);
  }
  if (options.symbols) {
    charset += CHAR_SETS.symbols;
    requiredChars.push(CHAR_SETS.symbols[getSecureRandomInt(CHAR_SETS.symbols.length)]);
  }

  // 文字種が選択されていない場合
  if (charset.length === 0) {
    return '文字種を選択してください';
  }

  // パスワード生成
  const remainingLength = options.length - requiredChars.length;
  const passwordArray: string[] = [...requiredChars];

  for (let i = 0; i < remainingLength; i++) {
    const randomIndex = getSecureRandomInt(charset.length);
    passwordArray.push(charset[randomIndex]);
  }

  // シャッフル（Fisher-Yates）
  for (let i = passwordArray.length - 1; i > 0; i--) {
    const j = getSecureRandomInt(i + 1);
    [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
  }

  return passwordArray.join('');
};

/**
 * パスワード強度を計算
 */
const calculateStrength = (password: string, options: PasswordOptions): PasswordStrength => {
  let score = 0;

  // 長さによるスコア
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  if (password.length >= 24) score += 1;

  // 文字種によるスコア
  const typesCount = [
    options.uppercase,
    options.lowercase,
    options.numbers,
    options.symbols,
  ].filter(Boolean).length;

  score += typesCount;

  // 強度判定
  if (score <= 3) {
    return { score, label: '弱い', className: 'strength-weak' };
  } else if (score <= 5) {
    return { score, label: '普通', className: 'strength-fair' };
  } else if (score <= 7) {
    return { score, label: '良好', className: 'strength-good' };
  } else {
    return { score, label: '強力', className: 'strength-strong' };
  }
};

/**
 * 強度インジケーターを更新
 */
const updateStrengthIndicator = (password: string, options: PasswordOptions): void => {
  const strength = calculateStrength(password, options);
  
  strengthBar.className = 'strength-fill ' + strength.className;
  strengthText.textContent = strength.label;
  strengthText.style.color = getStrengthColor(strength.className);
};

/**
 * 強度に応じた色を取得
 */
const getStrengthColor = (className: string): string => {
  const colors: Record<string, string> = {
    'strength-weak': '#ef4444',
    'strength-fair': '#f59e0b',
    'strength-good': '#3b82f6',
    'strength-strong': '#22c55e',
  };
  return colors[className] || '#fff';
};

/**
 * 履歴に追加
 */
const addToHistory = (password: string): void => {
  // 重複チェック
  if (passwordHistory.includes(password)) return;
  
  // 先頭に追加
  passwordHistory.unshift(password);
  
  // 最大数を超えたら削除
  if (passwordHistory.length > MAX_HISTORY) {
    passwordHistory.pop();
  }
  
  renderHistory();
};

/**
 * 履歴を描画
 */
const renderHistory = (): void => {
  if (passwordHistory.length === 0) {
    historyList.innerHTML = '<div class="empty-history">履歴はありません</div>';
    return;
  }

  historyList.innerHTML = passwordHistory
    .map(
      (pw) => `
      <div class="history-item">
        <code>${escapeHtml(pw)}</code>
        <button onclick="copyToClipboard('${escapeHtml(pw)}')" title="コピー">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
          </svg>
        </button>
      </div>
    `
    )
    .join('');
};

/**
 * HTMLエスケープ
 */
const escapeHtml = (text: string): string => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

/**
 * クリップボードにコピー
 */
const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
    showCopySuccess();
  } catch {
    // フォールバック
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showCopySuccess();
  }
};

/**
 * コピー成功表示
 */
const showCopySuccess = (): void => {
  copyBtn.classList.add('copied');
  const originalText = copyBtn.querySelector('span');
  if (originalText) {
    const original = originalText.textContent;
    originalText.textContent = 'コピーしました！';
    setTimeout(() => {
      copyBtn.classList.remove('copied');
      originalText.textContent = original;
    }, 2000);
  }
};

/**
 * パスワードを生成して表示
 */
const handleGenerate = (): void => {
  const options = getOptions();
  const password = generatePassword(options);
  
  passwordDisplay.textContent = password;
  passwordDisplay.classList.add('shake');
  setTimeout(() => passwordDisplay.classList.remove('shake'), 300);
  
  if (!password.includes('文字種')) {
    updateStrengthIndicator(password, options);
    addToHistory(password);
  }
};

/**
 * 履歴をクリア
 */
const clearHistory = (): void => {
  passwordHistory = [];
  renderHistory();
};

// イベントリスナー設定
lengthSlider.addEventListener('input', () => {
  lengthValue.textContent = lengthSlider.value;
});

generateBtn.addEventListener('click', handleGenerate);
refreshBtn.addEventListener('click', handleGenerate);
copyBtn.addEventListener('click', () => {
  const password = passwordDisplay.textContent;
  if (password && !password.includes('文字種') && !password.includes('生成ボタン')) {
    copyToClipboard(password);
  }
});
clearHistoryBtn.addEventListener('click', clearHistory);

// チェックボックスの少なくとも1つは有効にする
[uppercaseCheckbox, lowercaseCheckbox, numbersCheckbox, symbolsCheckbox].forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    const anyChecked = [
      uppercaseCheckbox.checked,
      lowercaseCheckbox.checked,
      numbersCheckbox.checked,
      symbolsCheckbox.checked,
    ].some(Boolean);
    
    if (!anyChecked) {
      checkbox.checked = true;
    }
  });
});

// グローバル関数として公開（履歴のコピーボタン用）
(window as any).copyToClipboard = copyToClipboard;

// 初期化
renderHistory();
