/*
 * @Description: File Content
 * @Author: LinHao
 * @Date: 2019-09-27 17:25:47
 * @LastEditors: LinHao
 * @LastEditTime: 2019-09-27 17:29:39
 */
type AwaitWrapResult<T, E> = [ null | E, null | T ];

export function awaitWrap <T, E = Error>( promise: Promise<T> ): Promise<AwaitWrapResult<T, E>> {
    return promise
    .then(
        data => [ null, data ],
        (err: E) => [ err, null ]
    )
}