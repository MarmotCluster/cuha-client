import React from 'react';
import { useSelector } from 'react-redux';
import { colorMainClassname } from './utils';

const CreateChallenge = () => {
  const { accounts, seto } = useSelector((state) => ({
    accounts: state.accounts,
    seto: state.seto,
  }));
  // Redux

  return (
    <main className={colorMainClassname[seto.theme]}>
      <div className="area" style={{ fontSize: '1.4rem' }}>
        <div className="main-post-challenge">
          <input type="text" className="form-input" name="title" placeholder="챌린지 제목" />
          <input type="text" className="form-input" name="flag" placeholder="플래그 (정답)" />
          <input type="number" className="form-input" name="reward" placeholder="제공할 점수" />
          <select name="type" className="form-select">
            <option disabled value="" selected>
              문제 타입
            </option>
            <option value="forensic">포렌식</option>
            <option value="reversing">리버싱</option>
            <option value="syshacking">시스템해킹</option>
            <option value="web">웹</option>
            <option value="misc">기타</option>
          </select>
          <select name="tier" className="form-select">
            <option disabled value="" selected>
              티어
            </option>
            <option value="bronze">브론즈</option>
            <option value="silver">실버</option>
            <option value="gold">골드</option>
            <option value="platinum">플레티넘</option>
            <option value="diamond">다이아몬드</option>
          </select>
          <textarea name="body" className="form-body" placeholder="문제 설명"></textarea>
          <p style={{ padding: '1rem 0' }}>추가된 파일 (최대 5개):</p>

          <div className="form-files">
            <div className="form-files__item">
              <p className="form-files__item-title">test-needed.zip</p>
              <button type="button" className="form-files__item-btn__delete"></button>
            </div>
            <div className="form-files__item">
              <p className="form-files__item-title">test-needed.zip</p>
              <button type="button" className="form-files__item-btn__delete"></button>
            </div>
            <div className="form-files__item">
              <p className="form-files__item-title">test-needed.zip</p>
              <button type="button" className="form-files__item-btn__delete"></button>
            </div>
            <div className="form-files__item">
              <p className="form-files__item-title">test-needed.zip</p>
              <button type="button" className="form-files__item-btn__delete"></button>
            </div>
            <div className="form-files__item">
              <p className="form-files__item-title">test-needed.zip</p>
              <button type="button" className="form-files__item-btn__delete"></button>
            </div>
          </div>

          <div className="form-files-upload">
            <input type="file" name="contents" />
            <p className="form-files-upload__title">...파일 추가...</p>
          </div>

          <button type="button" className="form-upload">
            업로드
          </button>
        </div>
      </div>
      <div style={{ height: '5.8rem' }}></div>
    </main>
  );
};

export default CreateChallenge;
