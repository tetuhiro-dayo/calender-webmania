import Link from "next/link";

export default function NotFound() {
    return (
        <div>
            <h1>404 - ページが見つかりません</h1>
            <p>お探しのページは存在しないか、移動されました。</p>
            <Link href="/">ホームに戻る</Link>
        </div>
    );
}
