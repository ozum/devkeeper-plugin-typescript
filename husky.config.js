module.exports = {
  hooks: {
    "pre-commit": "devkeeper readme && git add README.md && lint-staged",
    "prepare-commit-msg": "exec < /dev/tty && git cz --hook || true",
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
  },
};