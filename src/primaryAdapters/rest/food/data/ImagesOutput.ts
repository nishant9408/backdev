import { ApiProperty } from '@nestjs/swagger';

interface ImagesOutputBuilder {
    large: string | null;
    medium: string | null;
    small: string | null;
}

export class ImagesOutput {
    @ApiProperty({ type: String, nullable: true })
    large: string | null;

    @ApiProperty({ type: String, nullable: true })
    medium: string | null;

    @ApiProperty({ type: String, nullable: true })
    small: string | null;

    public static fromObject(builder: ImagesOutputBuilder): ImagesOutput {
        const image = new ImagesOutput();
        image.large = builder.large;
        image.medium = builder.medium;
        image.small = builder.small;
        return image;
    }
}
