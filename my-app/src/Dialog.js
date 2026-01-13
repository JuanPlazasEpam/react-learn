import React from 'react';
import ReactDOM from 'react-dom';

const e = React.createElement;

const modalRoot =
  document.getElementById('modal-root') ||
  (() => {
    const el = document.createElement('div');
    el.id = 'modal-root';
    document.body.appendChild(el);
    return el;
  })();

export default function Dialog({ title, children, onClose }) {
  return ReactDOM.createPortal(
    e(
      'div',
      { style: styles.overlay },
      e(
        'div',
        { style: styles.dialog, role: 'dialog', 'aria-modal': true },
        [
          e(
            'div',
            { key: 'header', style: styles.header },
            [
              e(
                'div',
                { key: 'title', style: styles.title },
                title
              ),
              e(
                'button',
                {
                  key: 'close',
                  onClick: onClose,
                  'aria-label': 'Close dialog',
                  style: styles.closeBtn,
                },
                '×'
              ),
            ]
          ),
          e(
            'div',
            { key: 'body', style: styles.body },
            children
          ),
        ]
      )
    ),
    modalRoot
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  dialog: {
    backgroundColor: '#fff',
    width: 500,
    maxWidth: '90%',
    borderRadius: 4,
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    borderBottom: '1px solid #ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeBtn: {
    fontSize: 24,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  body: {
    padding: 16,
  },
};
