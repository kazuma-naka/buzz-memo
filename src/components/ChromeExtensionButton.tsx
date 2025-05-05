export default function ChromeExtensionButton() {
  return (
    <a
      href="https://chrome.google.com/webstore"
      target="_blank"
      rel="noopener noreferrer"
      className="
          flex
          items-center
          justify-center
          gap-2
          px-6 py-3
          rounded-full
          border border-[#5C8DEC]
          text-[#5C8DEC]
          hover:bg-[#5C8DEC] hover:text-white
          transition
        "
    >
      <span>Chrome拡張をダウンロード</span>
    </a>
  );
}
