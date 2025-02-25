export function mapEnum<
    SourceEnum extends Record<string, string | number>,
    TargetEnum extends Record<string, string | number>,
>(
    sourceEnum: SourceEnum,
    targetEnum: TargetEnum,
    value: TargetEnum[keyof TargetEnum],
): SourceEnum[keyof SourceEnum] {
    return sourceEnum[
        Object.keys(targetEnum).find(
            (key) => targetEnum[key] === value,
        )! as keyof SourceEnum
    ] as SourceEnum[keyof SourceEnum];
}
