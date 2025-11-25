export const FragQuantize = `
    uniform sampler2D tDiffuse;
    varying vec2 vUv;
    uniform vec2 resolution;

    void main() {
        const int cell_size_px = 5;
        const int cells_margin = 1;

        int ncells_x = int(resolution.x) / cell_size_px;
        int ncells_y = int(resolution.y) / cell_size_px;
        
        int qpos_x = (int(vUv.x * resolution.x) / cell_size_px);
        int qpos_y = (int(vUv.y * resolution.y) / cell_size_px);

        float offset_x = float(int(vUv.x * resolution.x) - (qpos_x * cell_size_px)) / float(cell_size_px);
        float offset_y = float(int(vUv.y * resolution.y) - (qpos_y * cell_size_px)) / float(cell_size_px);

        vec3 sampled_angle = vec3(0,0,0);
        for (int i=cells_margin; i < cell_size_px-cells_margin; i++) {
            for (int j=cells_margin; j < cell_size_px-cells_margin; j++) {
                vec2 sample_point = vec2((float(qpos_x) + (float(i)/float(cell_size_px))) / float(ncells_x), (float(qpos_y) + (float(j)/float(cell_size_px))) / float(ncells_y));
                vec3 csample = texture2D(tDiffuse, sample_point).rgb;
                sampled_angle += csample.rgb;
            }
        }

        if (sampled_angle.r == 0.0) {
            gl_FragColor = vec4(0.0,0.0,0.0,0.0);
            return;
        }

        float angle = atan(sampled_angle.b, sampled_angle.g);
        gl_FragColor = vec4(angle, offset_x, offset_y, 1.0);
    }

`

export const FragAscii = `
    uniform sampler2D tDiffuse;
    varying vec2 vUv;
    uniform vec2 resolution;

    vec3 angle_colormap(vec2 angle) {
        return vec3(0.0, 1.0-angle.y, 1.0-angle.x);
    }

    int fragFallsOnAngle(vec2 angle, vec2 pos) {

        const float margin = 0.1;
        if (pos.x < margin || pos.y < margin) { return 0; }
        if (pos.x > (1.0-margin) || pos.y > (1.0-margin)) { return 0; }

        pos -= vec2(0.5, 0.5);
        float adot = abs((pos.x * angle.x) + (pos.y * angle.y));
        if (adot < .1) { return 1; }

        return 0;
    }


    void main() {
        vec4 texsample = texture2D(tDiffuse, vUv);
        int display = int(texsample.a);
        if (display == 0) { gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); return; }

        float angle = texsample.r;
        float offset_x = texsample.g;
        float offset_y = texsample.b;

        vec2 angle_vec = vec2(cos(angle), sin(angle));
        if (fragFallsOnAngle(angle_vec, vec2(offset_x, offset_y)) == 0) {
            gl_FragColor = vec4(1.0,1.0,1.0,1.0); return;
        }
        

        vec3 angle_color = angle_colormap(angle_vec);
        gl_FragColor = vec4(angle_color.xyz, 1.0);
    }
`